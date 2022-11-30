import {
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore/lite';
import { useCallback, useMemo } from 'react';

import { useFirebase } from 'ui/contexts';

export function useFirestore() {
  const { app } = useFirebase();
  const db = useMemo(() => app && getFirestore(app), [app]);
  const getDocTuples = useCallback(
    async (path: string) => {
      if (db) {
        const c = collection(db, path);
        const querySnapshot = await getDocs(c);

        return querySnapshot.docs.map((doc) => [doc.id, doc.data()]) as [string, QueryDocumentSnapshot<DocumentData>][];
      }
    },
    [db]
  );
  const getDocTuple = useCallback(
    async (path: string) => {
      if (db) {
        const querySnapshot = await getDoc(doc(db, path));

        return [querySnapshot.id, querySnapshot.data()] as [string, QueryDocumentSnapshot<DocumentData>];
      }
    },
    [db]
  );
  const addDocs = useCallback(
    async (path: string, docs: object[]) =>
      db ? Promise.all(docs.map(async (doc) => addDoc(collection(db, path), doc))) : Promise.reject('No db'),
    [db]
  );
  const updateDocs = useCallback(
    (updates: [string, object][]) =>
      db
        ? Promise.all(updates.map(async ([path, updates]) => setDoc(doc(db, path), updates)))
        : Promise.reject('No db'),
    [db]
  );

  return { isLoading: !db, addDocs, getDocTuple, getDocTuples, updateDocs, db };
}
