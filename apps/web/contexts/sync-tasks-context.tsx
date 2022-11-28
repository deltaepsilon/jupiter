import { MessageAction, SyncStatusMessage, encodePostMessage } from 'data/service-worker';
import { SendMessage, useServiceWorker } from 'web/contexts/service-worker-context';
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

import { Payload } from '@quiver/post-message';
import { WEB } from 'data/web';
import { getDownloadQueueRefPath } from 'data/download';
import { localforage } from 'ui/utils';
import { useRtdb } from 'ui/hooks';

type ManageSyncTaskArgs = { action: MessageAction; taskId: string };

interface SyncTasksValue {
  createSyncTask: (syncTask: SyncTask) => void;
  removeSyncTask: (taskId: string) => Promise<void>;
  manageSyncTask: (args: ManageSyncTaskArgs) => Promise<Payload<any>>;
  isActive: boolean;
  isLoading: boolean;
  syncTaskRecords?: SyncTaskRecords;
}

const SyncTasksContext = createContext<SyncTasksValue>({
  createSyncTask: () => {},
  manageSyncTask: async (_: ManageSyncTaskArgs) => ({
    success: false,
    data: false,
  }),
  removeSyncTask: async (_: string) => {},
  isActive: true,
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
  const [isActive, setIsActive] = useState<boolean>(false);
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
    async ({ action, taskId }: { taskId: string; action: MessageAction }) => {
      const sendSyncStatusMessage = sendMessage as SendMessage<SyncStatusMessage>;
      const statusResult = await sendSyncStatusMessage(
        encodePostMessage<SyncStatusMessage>({ action: MessageAction.syncStatus, data: { taskId } })
      );
      const isActive = !!statusResult.data.isActive;
      const isStart = action === MessageAction.syncStart;

      setIsActive(isActive);

      if (isActive || isStart) {
        return sendMessage(encodePostMessage({ action, data: { taskId } }));
      } else {
        return { success: false, data: false };
      }
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
    <SyncTasksContext.Provider
      value={{ createSyncTask, isActive, isLoading, removeSyncTask, manageSyncTask, syncTaskRecords }}
    >
      {children}
    </SyncTasksContext.Provider>
  );
}
