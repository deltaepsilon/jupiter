import { SyncJob, SyncJobRecord, SyncJobRecords, SyncJobs, getSyncJobsRefPath, serializeSyncJob } from 'data/sync';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { push, ref } from 'firebase/database';

import { WEB } from 'data/web';
import { useRtdb } from 'ui/hooks';

interface SyncJobsValue {
  createSyncJob: (syncJob: SyncJob) => void;
  isLoading: boolean;
  syncJobRecords: SyncJobRecords;
}

const SyncJobsContext = createContext<SyncJobsValue>({
  createSyncJob: () => {},
  isLoading: true,
  syncJobRecords: [] as SyncJobRecords,
});

export function useSyncJobs() {
  return useContext(SyncJobsContext);
}

interface Props {
  children: React.ReactNode;
  userId: string;
}

export function SyncJobsProvider({ children, userId }: Props) {
  const { database, listen } = useRtdb();
  const [isLoading, setIsLoading] = useState<SyncJobsValue['isLoading']>(true);
  const [syncJobRecords, setSyncJobRecords] = useState<SyncJobsValue['syncJobRecords']>([]);
  const syncJobsRef = useMemo(
    () => userId && database && ref(database, getSyncJobsRefPath(userId)),
    [database, userId]
  );
  const createSyncJob = useCallback(
    async (syncJob: SyncJob) => {
      if (syncJobsRef) {
        const { key } = push(syncJobsRef, serializeSyncJob(syncJob));

        console.log('createSyncJob', key);
        // TODO: save syncJob to indexedDB
      }
    },
    [syncJobsRef]
  );

  useEffect(() => {
    const unsubscribe = listen(WEB.DATABASE.PATHS.SYNC_JOBS(userId), (snapshot) => {
      const key = snapshot.key;
      const value = snapshot.val();

      console.log({ id: key, value });

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [listen, userId]);

  return (
    <SyncJobsContext.Provider value={{ createSyncJob: createSyncJob, isLoading, syncJobRecords }}>
      {children}
    </SyncJobsContext.Provider>
  );
}
