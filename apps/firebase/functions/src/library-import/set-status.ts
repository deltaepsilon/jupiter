import { LibraryTaskStatus, libraryImportSchema } from 'data/library';

import { FIREBASE } from 'data/firebase';
import { getApp } from '../utils';

interface Args {
  libraryId: string;
  isSubscribed: boolean;
  status: LibraryTaskStatus;
  userId: string;
}

export async function setStatus({ libraryId, isSubscribed, status, userId }: Args) {
  const { libraryImport, libraryImportRef } = await getLibraryImport({ libraryId, userId });
  const updates = libraryImportSchema.parse({ ...libraryImport, isSubscribed, status, updated: new Date() });

  await libraryImportRef.update(updates);

  return updates;
}

async function getLibraryImport({ libraryId, userId }: { libraryId: string; userId: string }) {
  const app = getApp();
  const libraryImportRef = app.database().ref(FIREBASE.DATABASE.PATHS.LIBRARY_IMPORT(userId, libraryId));
  const snapshot = await libraryImportRef.get();
  const value = snapshot.val();
  const libraryImport = libraryImportSchema.parse(value || {});

  return { libraryImport, libraryImportRef };
}
