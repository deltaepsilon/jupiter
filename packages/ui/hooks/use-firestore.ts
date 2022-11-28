import {
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  getDocs,
  getFirestore,
} from 'firebase/firestore/lite';
import { useCallback, useMemo } from 'react';

import { NOOP } from 'ui/utils';
import { useFirebase } from 'ui/contexts';

export function useFirestore() {
  const { app } = useFirebase();
  const db = useMemo(() => app && getFirestore(app), [app]);
  const getDocTuples = useCallback(
    async (path: string) => {
      if (db) {
        console.log({ path });
        const c = collection(db, path);
        const querySnapshot = await getDocs(c);

        return querySnapshot.docs.map((doc) => [doc.id, doc.data()]) as [string, QueryDocumentSnapshot<DocumentData>][];
      }
    },
    [db]
  );
  const addDocs = useCallback(
    async (path: string, docs: object[]) =>
      db ? Promise.all(docs.map(async (doc) => addDoc(collection(db, path), doc))) : Promise.reject('No db'),
    [db]
  );

  return { addDocs, getDocTuples, db };
}
