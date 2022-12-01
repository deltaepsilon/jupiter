import { Database, DatabaseReference, get, increment, ref, remove, update } from 'firebase/database';
import { DocumentSnapshot, Firestore, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { Library, LibraryTaskStatus, libraryDownloadSchema, librarySchema } from 'data/library';
import { MediaItem, mediaItemsResponseSchema } from 'data/media-items';

import { WEB } from 'data/web';
import { addParams } from 'ui/utils';

export interface InitLibraryDownloadArgs {
  database: Database;
  db: Firestore;
  libraryId: string;
  userId: string;
}

export type InitLibraryDownloadResult = ReturnType<typeof initLibraryDownload>;

export async function initLibraryDownload({ database, db, libraryId, userId }: InitLibraryDownloadArgs) {
  const libraryDownloadRef = ref(database, WEB.DATABASE.PATHS.LIBRARY_DOWNLOAD(userId, libraryId));
  const libraryDownloadQueueRef = ref(database, WEB.DATABASE.PATHS.LIBRARY_DOWNLOAD_QUEUE(userId, libraryId));

  const setStatus = getSetStatus({ libraryId, libraryDownloadRef });
  const getStatus = getGetStatus(libraryId);
  const libraryDownload = await getLibraryDownload(libraryDownloadRef);

  await setStatus(libraryDownload.status); // Set initial status. The worker tends to sleep itself.

  async function start() {
    console.log('start');
  }

  async function pause() {
    console.log('pause');
  }

  async function cancel() {
    console.log('cancel');
  }

  async function destroy() {
    console.log('destroy');
  }

  return { start, pause, cancel, destroy, getStatus, setStatus };
}

const statusMap: Map<string, LibraryTaskStatus> = new Map();
interface SetStatusArgs {
  libraryId: string;
  libraryDownloadRef: DatabaseReference;
}
function getSetStatus({ libraryId, libraryDownloadRef }: SetStatusArgs) {
  return async (status: LibraryTaskStatus) => {
    const libraryDownload = await getLibraryDownload(libraryDownloadRef);
    const updates = libraryDownloadSchema.parse({ ...libraryDownload, status, updated: new Date() });

    await update(libraryDownloadRef, updates);

    statusMap.set(libraryId, status);

    return updates;
  };
}

function getGetStatus(libraryId: string) {
  return () => statusMap.get(libraryId);
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
  libraryId: string;
  userId: string;
}
export async function getLibraryDownloadInstance({ database, db, libraryId, userId }: GetLibraryDownloadArgs) {
  return libraryDownloadsMap.get(libraryId) || (await initLibraryDownload({ database, db, libraryId, userId }));
}
