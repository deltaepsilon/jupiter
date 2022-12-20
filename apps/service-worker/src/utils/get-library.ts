import { Firestore, doc, getDoc } from 'firebase/firestore/lite';

import { FIREBASE } from 'data/firebase';
import { librarySchema } from 'data/library';

export async function getLibrary({ db, libraryId, userId }: { db: Firestore; libraryId: string; userId: string }) {
  const path = FIREBASE.FIRESTORE.COLLECTIONS.LIBRARY(userId, libraryId);
  const librarySnapshot = await getDoc(doc(db, path));
  const library = librarySchema.parse(librarySnapshot.data());

  return { library, librarySnapshot };
}
