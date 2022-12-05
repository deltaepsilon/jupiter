import {
  Database,
  DatabaseReference,
  Unsubscribe,
  get,
  increment,
  limitToFirst,
  onChildAdded,
  orderByKey,
  query,
  ref,
  remove,
  startAfter,
  update,
} from 'firebase/database';
import { DocumentSnapshot, Firestore, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import {
  Library,
  LibraryDownload,
  LibraryDownloadTask,
  LibraryTaskStatus,
  libraryDownloadSchema,
  librarySchema,
} from 'data/library';
import { MediaItem, listMediaItemsResponseSchema, mediaItemSchema } from 'data/media-items';
import { Queue, QueueTasks, TaskState, taskSchema } from '@quiver/firebase-queue';

import { MEDIA_ITEMS_TTL_MS } from '../data';
import { WEB } from 'data/web';
import { addParams } from 'ui/utils';
import { batchGetMediaItemsResponseSchema } from 'data/media-items';
import { getLibrary } from '../utils/get-library';
import throttle from 'lodash/throttle';

export interface InitLibraryDownloadArgs {
  database: Database;
  db: Firestore;
  directoryHandle: FileSystemDirectoryHandle;
  libraryId: string;
  userId: string;
}

type LibraryDownloadData = LibraryDownloadTask['data'];

export type InitLibraryDownloadResult = ReturnType<typeof initLibraryDownload>;

export async function initLibraryDownload({
  database,
  db,
  directoryHandle,
  libraryId,
  userId,
}: InitLibraryDownloadArgs) {
  const libraryDownloadRef = ref(database, WEB.DATABASE.PATHS.LIBRARY_DOWNLOAD(userId, libraryId));
  const libraryDownloadQueueRef = ref(database, WEB.DATABASE.PATHS.LIBRARY_DOWNLOAD_QUEUE(userId, libraryId));
  const mediaItemsRef = ref(database, WEB.DATABASE.PATHS.LIBRARY_MEDIA_ITEMS(userId, libraryId));
  const { library } = await getLibrary({ db, libraryId, userId });

  const queue = Queue<LibraryDownloadData>({
    batchSize: 1, // 50 max
    callback: getHandleLibraryDownloadTask({ directoryHandle, library }),
    ref: libraryDownloadQueueRef,
  });

  const setState = getSetState({ libraryId, libraryDownloadRef });
  const getState = getGetState(libraryId);
  const libraryDownload = await getLibraryDownload(libraryDownloadRef);

  // Set initial status. The worker tends to sleep itself.
  await setState({ lastKey: libraryDownload.lastKey, status: libraryDownload.status });

  async function start() {
    const contents = await getDirectoryContents(directoryHandle);

    const { lastKey } = getState();
    let tasks: LibraryDownloadData[] = [];
    const handleTasks = throttle(async () => {
      if (tasks.length) {
        const tasksToAdd = tasks.splice(0);
        const lastKey = tasksToAdd[tasksToAdd.length - 1].key;

        await queue.add(tasksToAdd);
        await setState({ lastKey });
      }
    }, 1000);

    await queue.start();

    const q = lastKey
      ? query(mediaItemsRef, orderByKey(), limitToFirst(3), startAfter(lastKey))
      : query(mediaItemsRef, orderByKey(), limitToFirst(3));
    const unsubscribe = onChildAdded(q, (snapshot) => {
      const value = snapshot.val();
      const mediaItem = mediaItemSchema.parse(value || {});

      tasks.push({ key: snapshot.key ?? '', mediaItem });

      handleTasks();
    });

    await setState({ status: LibraryTaskStatus.running, unsubscribe });
  }

  async function pause() {
    console.log('pause');
    await queue.stop();
    await setState({ status: LibraryTaskStatus.paused });
  }

  async function cancel() {
    console.log('cancel');
    await queue.stop();
    await setState({ status: LibraryTaskStatus.canceled });
  }

  async function destroy() {
    console.log('destroy');
    await queue.empty();
    await setState({ status: LibraryTaskStatus.idle });
    await update(libraryDownloadRef, {
      lastKey: null,
      count: 0,
      bytes: 0,
      updated: new Date(),
    } as Partial<LibraryDownload>);
  }

  return { start, pause, cancel, destroy, getStatus: getState, setStatus: setState };
}

type DownloadState = { lastKey: string | null; status: LibraryTaskStatus; unsubscribe: Unsubscribe | null };
const DEFAULT_DOWNLOAD_STATE = { lastKey: null, status: LibraryTaskStatus.idle, unsubscribe: null };
const stateMap: Map<string, DownloadState> = new Map();
interface SetStatusArgs {
  libraryId: string;
  libraryDownloadRef: DatabaseReference;
}
function getSetState({ libraryId, libraryDownloadRef }: SetStatusArgs) {
  return async (stateUpdates: Partial<DownloadState>) => {
    const { lastKey, status } = updateState({ libraryId, stateUpdates });
    const libraryDownload = await getLibraryDownload(libraryDownloadRef);
    const updates = libraryDownloadSchema.parse({
      ...libraryDownload,
      lastKey,
      status,
      updated: new Date(),
    });

    await update(libraryDownloadRef, updates);

    return updates;
  };
}

function updateState({ libraryId, stateUpdates }: { libraryId: string; stateUpdates: Partial<DownloadState> }) {
  const getState = getGetState(libraryId);
  const existingState = unsubscribeExistingState(getState());
  const updatedState = { ...DEFAULT_DOWNLOAD_STATE, ...existingState, ...stateUpdates };

  if (!updatedState.lastKey) {
    updatedState.lastKey = null;
  }

  stateMap.set(libraryId, updatedState);

  return updatedState;
}

function unsubscribeExistingState(existingState: DownloadState | undefined) {
  // Beware the mutation. There should be an overwrite happening, so I'm taking the risk!
  if (existingState?.unsubscribe) {
    existingState.unsubscribe?.();
    existingState.unsubscribe = null;
  }

  return existingState;
}

function getGetState(libraryId: string) {
  return () => stateMap.get(libraryId) || DEFAULT_DOWNLOAD_STATE;
}

async function getLibraryDownload(libraryDownloadRef: DatabaseReference) {
  const snapshot = await get(libraryDownloadRef);
  const value = snapshot.val();
  const libraryDownload = libraryDownloadSchema.parse(value || {});

  return libraryDownload;
}

const libraryDownloadsMap: Map<string, InitLibraryDownloadResult> = new Map();
interface GetLibraryDownloadArgs {
  database: Database;
  db: Firestore;
  directoryHandle: FileSystemDirectoryHandle;
  libraryId: string;
  userId: string;
}
export async function getLibraryDownloadInstance({
  database,
  db,
  directoryHandle,
  libraryId,
  userId,
}: GetLibraryDownloadArgs) {
  return (
    libraryDownloadsMap.get(libraryId) ||
    (await initLibraryDownload({ database, db, directoryHandle, libraryId, userId }))
  );
}

async function getDirectoryContents(directoryHandle: FileSystemDirectoryHandle) {
  const handleTuples = [];

  for await (const tuple of directoryHandle.entries()) {
    handleTuples.push(tuple);
  }

  return handleTuples;
}

function getHandleLibraryDownloadTask({
  directoryHandle,
  library,
}: {
  directoryHandle: FileSystemDirectoryHandle;
  library: Library;
}) {
  return async function handleLibraryDownloadTask(tasks: QueueTasks) {
    try {
      const mediaItemIds = Object.values(tasks).map((task) => task.data.mediaItem.id);
      console.log({ mediaItemIds, tasks });
      const mediaItems = await batchGetMediaItems({ library, mediaItemIds });

      console.log('mediaItems', mediaItems);

      /**
       * TODO
       * - Write a function get check if the media item is stale and batch-update all stale media items.
       * - Download each media item's blob
       * - Analyze with Rembrant.js to get a true md5 hash
       * - Check existing metadata from the image/video
       * - Write blob to disk with the new metadata
       * - Metadata should include googlePhotosId and libraryItemKey
       *
       */

      // await Promise.all(
      //   Object.entries(tasks).map(async ([, task]) => {
      //     const { key, mediaItem } = task.data;
      //     const { id, url } = mediaItem;

      //     const response = await fetch(url);
      //     const blob = await response.blob();
      //     const fileHandle = await directoryHandle.getFileHandle(mediaItem.name, { create: true });
      //     const writable = await fileHandle.createWritable();
      //     await writable.write(blob);
      //     await writable.close();
      //   })
      // );

      return { success: true, message: 'processed' };
    } catch (error) {
      let message = 'handleLibraryDownloadTask error';

      if (error instanceof Error) {
        message = error.message;
      }

      return { success: false, message };
    }
  };
}

async function batchGetMediaItems({ library, mediaItemIds }: { library: Library; mediaItemIds: string[] }) {
  if (mediaItemIds.length > 50) {
    throw new Error('batchGetMediaItems: mediaItemIds length must be less than 50');
  }

  const { accessToken, refreshToken, updated } = library;
  const isStale = !updated || updated.getTime() < Date.now() - MEDIA_ITEMS_TTL_MS;
  const response = await fetch(`${location.origin}${WEB.API.MEDIA_ITEMS_BATCH_GET}`, {
    method: 'POST',
    body: JSON.stringify({
      accessToken: isStale ? undefined : accessToken,
      refreshToken,
      mediaItemIds: mediaItemIds.join(','),
    }),
  });
  const data = await response.json();

  return batchGetMediaItemsResponseSchema.parse(data);
}
