import { Database, DatabaseReference, increment, onValue, ref, update } from 'firebase/database';
import { Download, DownloadKey, downloadSchema, getDownloadQueueRefPath } from 'data/download';
import { Queue, QueueValue, metadataSchema, taskSchema } from '@quiver/firebase-queue';
import { SwMessageType, queueRefsMessageSchema } from 'data/service-worker';
import { SyncStage, SyncTask, SyncTaskKey, getSyncTaskRefPath } from 'data/sync';
import { addParams, localforage } from 'ui/utils';

import { WEB } from 'data/web';
import { mediaItemsResponseSchema } from 'data/media-items';
import { sendMessageToClients } from './utils/send-message-to-client';

const BATCH_SIZE = 10;
const ONE_HOUR_IN_MS = 3600000;

export type StartSyncTaskResult = {
  queue: QueueValue<Download>;
  unsubscribe: () => void;
};
export async function startSyncTask({
  database,
  taskId,
  userId,
}: {
  database: Database;
  taskId: string;
  userId: string;
}) {
  const syncTaskRefPath = getSyncTaskRefPath({ userId, taskId });
  const syncTaskRef = ref(database, syncTaskRefPath);
  const task = await localforage.getSyncTask(taskId);
  const queue = Queue<Download>({
    batchSize: BATCH_SIZE,
    callback: async () => {
      return new Promise((resolve) => {
        const random = Math.random();
        const timeout = random * 1000 * 2;
        const success = random > 0.5;

        setTimeout(() => {
          resolve({ success, message: `r: ${Math.round(random * 1000) / 1000}` });
        }, timeout);
      });
    },
    ref: ref(database, getDownloadQueueRefPath({ userId, syncTaskId: taskId })),
  });

  const unsubscribeMetadata = onValue(queue.metadataRef, (dataSnapshot) => {
    const value = dataSnapshot.val();
    const parsed = metadataSchema.safeParse(value);
    const hasNotStarted = !value;
    let shouldAddNextPage = hasNotStarted;

    if (parsed.success) {
      const { activeCount, waitingCount } = parsed.data;
      shouldAddNextPage = !activeCount && !waitingCount;

      console.log({ activeCount, waitingCount, shouldAddNextPage });
    }

    console.log({ shouldAddNextPage, value });
    shouldAddNextPage && task && addNextPage({ queue, syncTaskRef, task, taskId });
  });

  return {
    queue,
    unsubscribe: () => {
      unsubscribeMetadata();
      queue.stop();
    },
  };
}

async function addNextPage({
  queue,
  syncTaskRef,
  task,
  taskId,
}: {
  queue: QueueValue<Download>;
  syncTaskRef: DatabaseReference;
  task: SyncTask;
  taskId: string;
}) {
  const isExpiredAccessToken = Date.now() - task.accessTokenCreated > ONE_HOUR_IN_MS;
  const accessTokenCreated = isExpiredAccessToken ? Date.now() : task.accessTokenCreated;
  const url = addParams(`${location.origin}${WEB.API.MEDIA_ITEMS}`, {
    pageSize: 100,
    pageToken: task.nextPageToken,
    accessToken: isExpiredAccessToken ? undefined : task.accessToken,
    refreshToken: task.refreshToken,
  });

  const response = await fetch(url);
  const data = await response.json();

  console.log({ data });
  debugger;
  const { mediaItems, accessToken, nextPageToken } = mediaItemsResponseSchema.parse(data);
  const count = mediaItems.length;
  const downloadTasks = mediaItems.map((mediaItem) => downloadSchema.parse({ [DownloadKey.mediaItem]: mediaItem }));

  await queue.add(downloadTasks);

  await update(syncTaskRef, {
    [SyncTaskKey.accessToken]: accessToken,
    [SyncTaskKey.accessTokenCreated]: accessTokenCreated,
    [SyncTaskKey.fileCount]: increment(count),
    [SyncTaskKey.importedCount]: increment(count),
    [SyncTaskKey.previousPageToken]: task.nextPageToken,
    [SyncTaskKey.nextPageToken]: nextPageToken,
    [SyncTaskKey.stage]: SyncStage.downloading,
  });

  await localforage.updateSyncTask(taskId, {
    [SyncTaskKey.accessToken]: accessToken,
    [SyncTaskKey.accessTokenCreated]: accessTokenCreated,
    [SyncTaskKey.fileCount]: task.fileCount + count,
    [SyncTaskKey.importedCount]: task.importedCount + count,
    [SyncTaskKey.nextPageToken]: nextPageToken,
  });
}
