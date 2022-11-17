import {
  DataSnapshot,
  Database,
  Unsubscribe,
  get,
  increment,
  onChildAdded,
  onValue,
  ref,
  update,
} from 'firebase/database';
import {
  ProcessingKey,
  ProcessingStage,
  getDefaultProcessingJob,
  getProcessingJobRefPath,
  processingJobRecordSchema,
} from 'data/processing';
import {
  SyncJobKey,
  SyncJobRecord,
  SyncJobRecordTuple,
  SyncStage,
  getSyncJobRefPath,
  getSyncJobsRefPath,
  syncJobRecordSchema,
} from 'data/sync';
import { addParams, localforage } from 'ui/utils';

import { WEB } from 'data/web';
import { mediaItemsResponseSchema } from 'data/media-items';
import { processJobs } from './process-jobs';

const ONE_HOUR_IN_MS = 3600000;

export async function listenToSyncJobs({
  callback,
  database,
  userId,
}: {
  callback: typeof handleSyncJob;
  database: Database;
  userId: string;
}) {
  const syncJobsRef = ref(database, getSyncJobsRefPath(userId));
  const callbackUnsubscribers: Record<string, Unsubscribe | undefined> = {};
  function unsubscribeByKey(key: string) {
    callbackUnsubscribers[key]?.();
    delete callbackUnsubscribers[key];
  }
  let previous: SyncJobRecordTuple = [null, null];

  const jobUnsubscriber = onValue(syncJobsRef, (snapshot) => {
    const syncJobs = snapshot.val();

    syncJobs &&
      Object.entries(syncJobs).forEach(([key, job]) => {
        const parsedJob = syncJobRecordSchema.parse(job);
        const current: SyncJobRecordTuple = [key, parsedJob];
        const alreadySubscribed = !!callbackUnsubscribers[key];
        const isPaused = parsedJob[SyncJobKey.paused];

        console.log({ alreadySubscribed, isPaused });

        if (!alreadySubscribed) {
          const unsubscribe = callback({ current, database, previous, userId });

          if (key) {
            callbackUnsubscribers[key] = unsubscribe;
          }
        }

        if (alreadySubscribed && isPaused) {
          unsubscribeByKey(key);
        }

        previous = [key, parsedJob];
      });
  });

  return () => {
    jobUnsubscriber();

    Object.keys(callbackUnsubscribers).forEach(unsubscribeByKey);
  };
}

export function handleSyncJob({
  current,
  database,
  userId,
}: {
  current: SyncJobRecordTuple;
  database: Database;
  previous: SyncJobRecordTuple;
  userId: string;
}) {
  const [currentKey, currentJob] = current;
  // const [, previousJob] = previous;

  if (currentKey && currentJob) {
    const isProcessing = currentJob?.stage === SyncStage.processing;
    const isPaused = currentJob?.paused;
    const isActive = !isPaused && isProcessing;

    // const isFirstPage = !currentJob.nextPageToken;
    // const isNewPage = isFirstPage || currentJob?.nextPageToken !== previousJob?.nextPageToken;

    if (isActive) {
      return processJobs({
        database,
        queueNextMediaItems: getQueueNextMediaItems({ database, jobId: currentKey, userId }),
        syncJobId: currentKey,
        userId,
      });
    }
  }
}

export function startSyncJob({ database, jobId, userId }: { database: Database; jobId: string; userId: string }) {
  return updateSyncJob({ database, jobId, userId, updates: { [SyncJobKey.stage]: SyncStage.processing } });
}

export function updateSyncJob({
  database,
  jobId,
  userId,
  updates,
}: {
  database: Database;
  jobId: string;
  updates: Partial<SyncJobRecord>;
  userId: string;
}) {
  const syncJobRef = ref(database, getSyncJobRefPath(userId, jobId));

  return update(syncJobRef, updates);
}

interface QueueNextMediaItemsArgs {
  database: Database;
  jobId: string;
  userId: string;
}

export function getQueueNextMediaItems({ database, jobId, userId }: QueueNextMediaItemsArgs) {
  return async function queueNextMediaItems(): Promise<number> {
    const job = await localforage.getSyncJob(jobId);
    let result = 0;

    if (userId && job && !job?.paused) {
      const syncJobRefPath = getSyncJobRefPath(userId, jobId);
      const isExpiredAccessToken = Date.now() - job.accessTokenCreated > ONE_HOUR_IN_MS;
      const url = addParams(`${location.origin}${WEB.API.MEDIA_ITEMS}`, {
        pageSize: 100,
        pageToken: job.nextPageToken,
        accessToken: isExpiredAccessToken ? undefined : job.accessToken,
        refreshToken: job.refreshToken,
      });

      const response = await fetch(url);
      const data = await response.json();

      const { mediaItems, accessToken, nextPageToken } = mediaItemsResponseSchema.parse(data);
      const count = mediaItems.length;
      const accessTokenCreated = isExpiredAccessToken ? Date.now() : job.accessTokenCreated;
      const updates = mediaItems.reduce(
        (acc, mediaItem) => {
          acc[
            getProcessingJobRefPath({ userId, syncJobId: jobId, jobId: mediaItem.id, stage: ProcessingStage.active })
          ] = processingJobRecordSchema.parse({
            ...getDefaultProcessingJob(),
            [ProcessingKey.mediaItem]: mediaItem,
          });

          return acc;
        },
        {
          [`${syncJobRefPath}/${SyncJobKey.accessToken}`]: accessToken,
          [`${syncJobRefPath}/${SyncJobKey.accessTokenCreated}`]: accessTokenCreated,
          [`${syncJobRefPath}/${SyncJobKey.fileCount}`]: increment(count),
          [`${syncJobRefPath}/${SyncJobKey.importedCount}`]: increment(count),
          [`${syncJobRefPath}/${SyncJobKey.previousPageToken}`]: job.nextPageToken,
          [`${syncJobRefPath}/${SyncJobKey.nextPageToken}`]: nextPageToken,
          [`${syncJobRefPath}/${SyncJobKey.stage}`]: SyncStage.processing,
        } as Record<string, any>
      );

      await update(ref(database), updates);

      await localforage.updateSyncJob(jobId, {
        accessToken: accessToken,
        accessTokenCreated,
        fileCount: job.fileCount + count,
        importedCount: job.importedCount + count,
        nextPageToken: nextPageToken,
      });

      result = count;
    }

    return result;
  };
}
