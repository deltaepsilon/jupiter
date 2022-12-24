import { Database, get, ref, set, update } from 'firebase/database';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DaemonRecord } from 'data/daemon';
import { FIREBASE } from 'data/firebase';
import { useAuth } from 'ui/contexts';
import { useRtdb } from 'ui/hooks';

export function useDaemonRecord(libraryId: string) {
  const [daemonRecord, setDaemonRecord] = useState<DaemonRecord>();
  const { user } = useAuth();
  const userId = user?.uid;
  const { database } = useRtdb();
  const daemonRef = useMemo(
    () => database && userId && ref(database, FIREBASE.DATABASE.PATHS.LIBRARY_DAEMON(userId, libraryId)),
    [database, libraryId, userId]
  );
  const updateDaemonRecord = useCallback(async () => {
    if (daemonRef) {
      const snapshot = await get(daemonRef);
      const value = snapshot.val();

      setDaemonRecord(value || null);

      return value;
    }
  }, [daemonRef]);
  const updateRecord = useCallback(
    async (record: Partial<DaemonRecord>) => {
      if (daemonRef) {
        await update(daemonRef, record);

        return updateDaemonRecord();
      }
    },
    [daemonRef, updateDaemonRecord]
  );

  useEffect(() => {
    updateDaemonRecord();
  }, [updateDaemonRecord]);

  return { daemonRecord, isLoading: typeof daemonRecord === 'undefined', updateRecord };
}
