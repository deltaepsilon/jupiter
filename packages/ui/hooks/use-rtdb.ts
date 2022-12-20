import { DataSnapshot, onValue, ref } from 'firebase/database';

import { NOOP } from 'ui/utils';
import { useCallback } from 'react';
import { useFirebase } from 'ui/contexts';

export function useRtdb() {
  const { database } = useFirebase();
  const listen = useCallback(
    (path: string, callback: (snapshot: DataSnapshot) => void) =>
      database ? onValue(ref(database, path), callback) : NOOP,
    [database]
  );

  return { database, listen };
}
