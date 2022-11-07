import { DataSnapshot, getDatabase, onValue, ref } from 'firebase/database';
import { useCallback, useMemo } from 'react';

import { NOOP } from 'ui/utils';
import { useFirebase } from 'ui/contexts';

export function useRtdb() {
  const { app } = useFirebase();
  const database = useMemo(() => app && getDatabase(app), [app]);
  const listen = useCallback(
    (path: string, callback: (snapshot: DataSnapshot) => void) =>
      database ? onValue(ref(database, path), callback) : NOOP,
    [database]
  );

  return { database, listen };
}
