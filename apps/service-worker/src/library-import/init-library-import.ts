import { Ack, LibraryMessage, MessageAction, messageSchemasByAction } from 'data/service-worker';
import { DataSnapshot, Database, get, increment, ref, remove, update } from 'firebase/database';
import {
  DocumentData,
  DocumentSnapshot,
  Firestore,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore/lite';
import { Library, LibraryImportStatus, libraryImportSchema, librarySchema } from 'data/library';
import { MediaItem, mediaItemsResponseSchema } from 'data/media-items';

import { User } from 'firebase/auth';
import { WEB } from 'data/web';
import { addParams } from 'ui/utils';
import { z } from 'zod';

// Handler
const libraryImportsMap: Map<string, InitLibraryImportResult> = new Map();



// Library Import

export interface InitLibraryImportArgs {
  database: Database;
  db: Firestore;
  libraryId: string;
  userId: string;
}

export type InitLibraryImportResult = ReturnType<typeof initLibraryImport>;

export function initLibraryImport({ database, db, libraryId, userId }: InitLibraryImportArgs) {
  const libraryImportRef = ref(database, WEB.DATABASE.PATHS.LIBRARY_IMPORT(userId, libraryId));
  const libraryMediaItemsRef = ref(database, WEB.DATABASE.PATHS.LIBRARY_MEDIA_ITEMS(userId, libraryId));

  let status = LibraryImportStatus.idle;
  async function start() {
    const libraryImport = await getLibraryImport();
    const { library, librarySnapshot } = await getLibrary({ db, libraryId, userId });
    const { pageSize } = libraryImport;
    let nextPageToken = libraryImport.nextPageToken;

    status = LibraryImportStatus.running;

    while (status === LibraryImportStatus.running) {
      const { mediaItems, nextPageToken: maybeNextPageToken } = await getPage({
        library,
        librarySnapshot,
        pageSize,
        nextPageToken,
      });
      const updates = mediaItems.reduce((acc, mediaItem) => {
        acc[`date:${mediaItem.mediaMetadata.creationTime}|id:${mediaItem.id}`] = mediaItem;

        return acc;
      }, {} as Record<string, MediaItem>);

      await update(libraryMediaItemsRef, updates);
      await update(libraryImportRef, {
        count: increment(mediaItems.length),
        nextPageToken: maybeNextPageToken,
        status: !!maybeNextPageToken ? LibraryImportStatus.running : LibraryImportStatus.complete,
        updated: new Date(),
      });

      if (!maybeNextPageToken) {
        status = LibraryImportStatus.complete;

        await updateDoc(librarySnapshot.ref, { imported: true, updated: new Date() });
      }

      nextPageToken = maybeNextPageToken;
    }
  }

  async function pause() {
    status = LibraryImportStatus.paused;

    await setStatus(LibraryImportStatus.paused);
  }

  async function cancel() {
    status = LibraryImportStatus.canceled;

    await setStatus(LibraryImportStatus.canceled);
  }

  async function destroy() {
    status = LibraryImportStatus.idle;

    await setStatus(LibraryImportStatus.idle);
    await update(libraryImportRef, {
      nextPageToken: null,
      count: 0,
      status: LibraryImportStatus.idle,
      updated: new Date(),
    });
    await remove(libraryMediaItemsRef);
  }

  async function setStatus(status: LibraryImportStatus) {
    const libraryImport = await getLibraryImport();
    const updates = libraryImportSchema.parse({ ...libraryImport, status, updated: new Date() });

    await update(libraryImportRef, updates);

    return updates;
  }

  async function getLibraryImport() {
    const snapshot = await get(libraryImportRef);
    const value = snapshot.val();
    const libraryImport = libraryImportSchema.parse(value || {});

    return libraryImport;
  }

  return { start, pause, cancel, destroy, setStatus };
}

interface GetLibraryImportArgs {
  database: Database;
  db: Firestore;
  libraryId: string;
  userId: string;
}
async function getLibraryImportInstance({ database, db, libraryId, userId }: GetLibraryImportArgs) {
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
