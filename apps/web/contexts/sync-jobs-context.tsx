import { MessageType, SyncJobAction, syncJobStartMessageSchema } from 'data/service-worker';
import {
  SyncJob,
  SyncJobRecord,
  SyncJobRecords,
  SyncJobs,
  getSyncJobRefPath,
  getSyncJobsRefPath,
  serializeSyncJob,
  syncJobRecordSchema,
} from 'data/sync';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { push, ref, remove } from 'firebase/database';

import { WEB } from 'data/web';
import { localforage } from 'ui/utils';
import { useRtdb } from 'ui/hooks';
import { useServiceWorker } from 'web/contexts/service-worker-context';

interface SyncJobsValue {
  createSyncJob: (syncJob: SyncJob) => void;
  removeSyncJob: (jobId: string) => Promise<void>;
  startSyncJob: (jobId: string) => Promise<void>;
  isLoading: boolean;
  syncJobRecords?: SyncJobRecords;
}

const SyncJobsContext = createContext<SyncJobsValue>({
  createSyncJob: () => {},
  startSyncJob: async (_: string) => {},
  removeSyncJob: async (_: string) => {},
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
  const { sendMessage } = useServiceWorker();
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
  const removeSyncJob = useCallback(
    async (jobId: string) => {
      if (database && jobId) {
        const jobRef = ref(database, getSyncJobRefPath(userId, jobId));

        await remove(jobRef);

        localforage.removeSyncJob(jobId);
      }
    },
    [database, userId]
  );
  const startSyncJob = useCallback(
    async (jobId: string) => {
      const job = await localforage.getSyncJob(jobId);

      if (job) {
        const message = syncJobStartMessageSchema.parse({
          accessToken: job.accessToken,
          jobId,
          directoryHandle: job.directoryHandle,
          action: SyncJobAction.start,
          type: MessageType.syncJob,
        });

        sendMessage(message);
      }
    },
    [sendMessage]
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

  return (
    <SyncJobsContext.Provider value={{ createSyncJob, isLoading, removeSyncJob, startSyncJob, syncJobRecords }}>
      {children}
    </SyncJobsContext.Provider>
  );
}
