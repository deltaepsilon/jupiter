import { SwMessageType, SyncTaskAction, syncTaskMessageSchema, syncTaskStatusMessageSchema } from 'data/service-worker';
import {
  SyncTask,
  SyncTaskRecord,
  SyncTaskRecords,
  SyncTasks,
  getSyncTaskRefPath,
  getSyncTasksRefPath,
  serializeSyncTask,
  syncTaskRecordSchema,
} from 'data/sync';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { push, ref, remove, update } from 'firebase/database';

import { WEB } from 'data/web';
import { getDownloadQueueRefPath } from 'data/download';
import { localforage } from 'ui/utils';
import { useRtdb } from 'ui/hooks';
import { useServiceWorker } from 'web/contexts/service-worker-context';

type ManageSyncTaskArgs = { action: SyncTaskAction; taskId: string };

interface SyncTasksValue {
  createSyncTask: (syncTask: SyncTask) => void;
  removeSyncTask: (taskId: string) => Promise<void>;
  manageSyncTask: (args: ManageSyncTaskArgs) => Promise<void>;
  isLoading: boolean;
  syncTaskRecords?: SyncTaskRecords;
}

const SyncTasksContext = createContext<SyncTasksValue>({
  createSyncTask: () => {},
  manageSyncTask: async (_: ManageSyncTaskArgs) => {},
  removeSyncTask: async (_: string) => {},
  isLoading: true,
});

export function useSyncTasks() {
  return useContext(SyncTasksContext);
}

interface Props {
  children: React.ReactNode;
  userId: string;
}

export function SyncTasksProvider({ children, userId }: Props) {
  const { sendMessage } = useServiceWorker();
  const { database, listen } = useRtdb();
  const [isLoading, setIsLoading] = useState<SyncTasksValue['isLoading']>(true);
  const [syncTaskRecords, setSyncTaskRecords] = useState<SyncTasksValue['syncTaskRecords']>();
  const syncTasksRef = useMemo(
    () => userId && database && ref(database, getSyncTasksRefPath(userId)),
    [database, userId]
  );
  const createSyncTask = useCallback(
    async (syncTask: SyncTask) => {
      if (syncTasksRef) {
        const { key } = push(syncTasksRef, serializeSyncTask(syncTask));

        key && localforage.addSyncTask(key, syncTask);
      }
    },
    [syncTasksRef]
  );
  const removeSyncTask = useCallback(
    async (taskId: string) => {
      if (database && taskId) {
        const success = await localforage.removeSyncTask(taskId);

        if (success) {
          await update(ref(database), {
            [getSyncTaskRefPath({ taskId, userId })]: null,
            [getDownloadQueueRefPath({ userId, syncTaskId: taskId })]: null,
          });
        }
      }
    },
    [database, userId]
  );
  const manageSyncTask = useCallback(
    async ({ action, taskId }: { taskId: string; action: SyncTaskAction }) => {
      /**
       * TODO: Figure out an ack system
       * Each outgoing message should get queued and acked. This will enable message responses if it all goes
       * in order.
       */
      const statusResult = await sendMessage(
        syncTaskMessageSchema.parse({ action: SyncTaskAction.status, taskId, type: SwMessageType.syncTask })
      );

      const message = syncTaskMessageSchema.parse({
        action,
        taskId,
        type: SwMessageType.syncTask,
      });

      sendMessage(message);
    },
    [sendMessage]
  );

  useEffect(() => {
    const unsubscribe = listen(WEB.DATABASE.PATHS.SYNC_TASKS(userId), (snapshot) => {
      const key = snapshot.key;
      const value = snapshot.val();

      if (value) {
        const syncTaskRecords = Object.entries(snapshot.val()).reduce((acc, [id, syncTask]) => {
          acc[id] = syncTaskRecordSchema.parse(syncTask);

          return acc;
        }, {} as SyncTaskRecords);

        setSyncTaskRecords(syncTaskRecords);
      } else {
        localforage.clearSyncTasks();
        setSyncTaskRecords(undefined);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [listen, userId]);

  return (
    <SyncTasksContext.Provider value={{ createSyncTask, isLoading, removeSyncTask, manageSyncTask, syncTaskRecords }}>
      {children}
    </SyncTasksContext.Provider>
  );
}
