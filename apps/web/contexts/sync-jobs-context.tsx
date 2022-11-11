import {
  SyncJob,
  SyncJobRecord,
  SyncJobRecords,
  SyncJobs,
  getSyncJobsRefPath,
  serializeSyncJob,
  syncJobRecordSchema,
} from 'data/sync';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { push, ref } from 'firebase/database';

import { WEB } from 'data/web';
import { localforage } from 'ui/utils';
import { useRtdb } from 'ui/hooks';

interface SyncJobsValue {
  createSyncJob: (syncJob: SyncJob) => void;
  isLoading: boolean;
  syncJobRecords?: SyncJobRecords;
}

const SyncJobsContext = createContext<SyncJobsValue>({
  createSyncJob: () => {},
  isLoading: true,
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
  const [syncJobRecords, setSyncJobRecords] = useState<SyncJobsValue['syncJobRecords']>();
  const syncJobsRef = useMemo(
    () => userId && database && ref(database, getSyncJobsRefPath(userId)),
    [database, userId]
  );
  const createSyncJob = useCallback(
    async (syncJob: SyncJob) => {
      if (syncJobsRef) {
        const { key } = push(syncJobsRef, serializeSyncJob(syncJob));

        key && localforage.addSyncJob(key, syncJob);
      }
    },
    [syncJobsRef]
  );

  useEffect(() => {
    const unsubscribe = listen(WEB.DATABASE.PATHS.SYNC_JOBS(userId), (snapshot) => {
      const key = snapshot.key;
      const value = snapshot.val();

      if (value) {
        const syncJobRecords = Object.entries(snapshot.val()).reduce((acc, [id, syncJob]) => {
          acc[id] = syncJobRecordSchema.parse(syncJob);

          return acc;
        }, {} as SyncJobRecords);

        setSyncJobRecords(syncJobRecords);
      } else {
        localforage.clearSyncJobs();
        setSyncJobRecords(undefined);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [listen, userId]);

  console.log({ syncJobRecords });

  return (
    <SyncJobsContext.Provider value={{ createSyncJob: createSyncJob, isLoading, syncJobRecords }}>
      {children}
    </SyncJobsContext.Provider>
  );
}
