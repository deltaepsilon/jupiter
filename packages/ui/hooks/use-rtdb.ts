import { DataSnapshot, DatabaseReference, onValue, ref } from 'firebase/database';

import { NOOP } from 'ui/utils';
import { useCallback } from 'react';
import { useFirebase } from 'ui/contexts';

export function useRtdb() {
  const { database } = useFirebase();
  const listen = useCallback(
    (path: string | DatabaseReference, callback: (snapshot: DataSnapshot) => void) => {
      if (database) {
        const listenRef = typeof path === 'string' ? ref(database, path) : path;

        return onValue(listenRef, callback);
      } else {
        return NOOP;
      }
    },
    [database]
  );

  return { database, listen };
}
