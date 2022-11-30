import { Database, DatabaseReference, get, increment, ref, remove, update } from 'firebase/database';
import { DocumentSnapshot, Firestore, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { Library, LibraryImportStatus, libraryImportSchema, librarySchema } from 'data/library';
import { MediaItem, mediaItemsResponseSchema } from 'data/media-items';

import { WEB } from 'data/web';
import { addParams } from 'ui/utils';

export interface InitLibraryImportArgs {
  database: Database;
  db: Firestore;
  libraryId: string;
  userId: string;
}

export type InitLibraryImportResult = ReturnType<typeof initLibraryImport>;

export async function initLibraryImport({ database, db, libraryId, userId }: InitLibraryImportArgs) {
  const libraryImportRef = ref(database, WEB.DATABASE.PATHS.LIBRARY_IMPORT(userId, libraryId));
  const libraryMediaItemsRef = ref(database, WEB.DATABASE.PATHS.LIBRARY_MEDIA_ITEMS(userId, libraryId));
  const setStatus = getSetStatus({ libraryId, libraryImportRef });
  const getStatus = getGetStatus(libraryId);
  const libraryImport = await getLibraryImport(libraryImportRef);

  await setStatus(libraryImport.status); // Set initial status. The worker tends to sleep itself.

  async function start() {
    const libraryImport = await getLibraryImport(libraryImportRef);
    const { library, librarySnapshot } = await getLibrary({ db, libraryId, userId });
    const { pageSize } = libraryImport;
    let nextPageToken = libraryImport.nextPageToken;

    await setStatus(LibraryImportStatus.running);

    while (getStatus() === LibraryImportStatus.running) {
      const { mediaItems, nextPageToken: maybeNextPageToken } = await getPage({
        library,
        librarySnapshot,
        pageSize,
        nextPageToken,
      });
      const mediaItemsUpdates = mediaItems.reduce((acc, mediaItem) => {
        acc[`date:${mediaItem.mediaMetadata.creationTime}|id:${mediaItem.id}`] = mediaItem;

        return acc;
      }, {} as Record<string, MediaItem>);
      const isLastPage = !maybeNextPageToken;

      if (isLastPage) await setStatus(LibraryImportStatus.complete);
      nextPageToken = maybeNextPageToken;

      await update(libraryMediaItemsRef, mediaItemsUpdates);
      await update(libraryImportRef, {
        count: increment(mediaItems.length),
        nextPageToken: nextPageToken || null,
        updated: new Date(),
        status: getStatus(),
      });

      if (isLastPage) await updateDoc(librarySnapshot.ref, { imported: true, updated: new Date() });
    }
  }

  async function pause() {
    await setStatus(LibraryImportStatus.paused);
  }

  async function cancel() {
    await setStatus(LibraryImportStatus.canceled);
  }

  async function destroy() {
    await setStatus(LibraryImportStatus.idle);
    await update(libraryImportRef, {
      nextPageToken: null,
      count: 0,
      status: LibraryImportStatus.idle,
      updated: new Date(),
    });
    await remove(libraryMediaItemsRef);
  }

  return { start, pause, cancel, destroy, getStatus, setStatus };
}

const statusMap: Map<string, LibraryImportStatus> = new Map();
interface SetStatusArgs {
  libraryId: string;
  libraryImportRef: DatabaseReference;
}
function getSetStatus({ libraryId, libraryImportRef }: SetStatusArgs) {
  return async (status: LibraryImportStatus) => {
    const libraryImport = await getLibraryImport(libraryImportRef);
    const updates = libraryImportSchema.parse({ ...libraryImport, status, updated: new Date() });

    await update(libraryImportRef, updates);

    statusMap.set(libraryId, status);

    return updates;
  };
}

function getGetStatus(libraryId: string) {
  return () => statusMap.get(libraryId);
}

async function getLibraryImport(libraryImportRef: DatabaseReference) {
  const snapshot = await get(libraryImportRef);
  const value = snapshot.val();
  const libraryImport = libraryImportSchema.parse(value || {});

  return libraryImport;
}

const libraryImportsMap: Map<string, InitLibraryImportResult> = new Map();
interface GetLibraryImportArgs {
  database: Database;
  db: Firestore;
  libraryId: string;
  userId: string;
}
export async function getLibraryImportInstance({ database, db, libraryId, userId }: GetLibraryImportArgs) {
  return libraryImportsMap.get(libraryId) || (await initLibraryImport({ database, db, libraryId, userId }));
}

const MEDIA_ITEMS_TTL_MS = 1000 * 60 * 60; // 1 Hour
interface GetPageArgs {
  library: Library;
  librarySnapshot: DocumentSnapshot;
  nextPageToken?: string;
  pageSize: number;
}
async function getPage({ library, librarySnapshot, pageSize, nextPageToken }: GetPageArgs) {
  const { accessToken, refreshToken, updated } = library;
  const isStale = !updated || updated.getTime() < Date.now() - MEDIA_ITEMS_TTL_MS;
  const response = await fetch(
    addParams(`${location.origin}${WEB.API.MEDIA_ITEMS}`, {
      accessToken: isStale ? undefined : accessToken,
      refreshToken,
      pageSize,
      nextPageToken,
    })
  );

  if (response.ok) {
    const data = await response.json();
    const { accessToken, mediaItems, nextPageToken } = mediaItemsResponseSchema.parse(data);

    if (isStale) {
      await updateDoc(librarySnapshot.ref, { accessToken, updated: new Date() });
    }

    return { mediaItems, nextPageToken };
  } else {
    throw response;
  }
}

async function getLibrary({ db, libraryId, userId }: { db: Firestore; libraryId: string; userId: string }) {
  const path = WEB.FIRESTORE.COLLECTIONS.LIBRARY(userId, libraryId);
  const librarySnapshot = await getDoc(doc(db, path));
  const library = librarySchema.parse(librarySnapshot.data());

  return { library, librarySnapshot };
}
