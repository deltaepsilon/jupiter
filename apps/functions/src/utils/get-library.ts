import { FIREBASE } from 'data/firebase';
import { getApp } from './get-app';
import { librarySchema } from 'data/library';

export async function getLibrary({ libraryId, userId }: { libraryId: string; userId: string }) {
  const admin = getApp();
  const path = FIREBASE.FIRESTORE.COLLECTIONS.LIBRARY(userId, libraryId);
  const librarySnapshot = await admin.firestore().doc(path).get();
  const library = librarySchema.parse(librarySnapshot.data());

  return { library, librarySnapshot };
}
