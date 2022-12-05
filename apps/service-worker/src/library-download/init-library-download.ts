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
import { MediaItem, mediaItemSchema, mediaItemsResponseSchema } from 'data/media-items';
import { Queue, QueueTasks, TaskState, taskSchema } from '@quiver/firebase-queue';

import { WEB } from 'data/web';
import { addParams } from 'ui/utils';
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
  const mediaItemsQuery = query(mediaItemsRef, orderByKey(), limitToFirst(10));

  const queue = Queue<LibraryDownloadData>({
    batchSize: 1,
    callback: handleLibraryDownloadTask,
    ref: libraryDownloadQueueRef,
  });

  async function handleLibraryDownloadTask(tasks: QueueTasks) {
    console.log('handleLibraryDownloadTask', tasks);

    return { success: true, message: 'processed' };
  }

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

        console.log('tasksToAdd');

        console.table(tasksToAdd);

        await queue.add(tasksToAdd);
        await setState({ lastKey });
      }
    }, 1000);

    await queue.start();

    /**
     * TODO:
     * 1. Page through child media items
     * 2. Add media items to queue
     * 3. Update lastKey using setState({ lastKey })
     */
    console.log({ lastKey });
    const q = lastKey
      ? query(mediaItemsRef, orderByKey(), limitToFirst(10), startAfter(lastKey))
      : query(mediaItemsRef, orderByKey(), limitToFirst(10));
    const unsubscribe = onChildAdded(q, (snapshot) => {
      const value = snapshot.val();
      const mediaItem = mediaItemSchema.parse(value || {});

      tasks.push({ key: snapshot.key ?? '', mediaItem });

      handleTasks();

      console.log('onChildAdded', tasks);
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
  console.log({ existingState, stateUpdates });
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
