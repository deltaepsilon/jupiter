import { DataSnapshot, Database, get, increment, onChildAdded, onValue, ref, update } from 'firebase/database';
import {
  SyncJob,
  SyncJobKey,
  SyncJobRecord,
  SyncStage,
  getSyncJobRefPath,
  getSyncJobsRefPath,
  syncJobRecordSchema,
} from 'data/sync';
import { addParams, localforage } from 'ui/utils';

import { User } from 'firebase/auth';
import { WEB } from 'data/web';
import { getProcessingJobRefPath } from 'data/processing';
import { mediaItemsResponseSchema } from 'data/media-items';

const ONE_HOUR_IN_MS = 3600000;

type SyncJobTuple = [string | null, SyncJobRecord | null];
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
  let previous: SyncJobTuple = [null, null];

  onValue(syncJobsRef, (snapshot) => {
    const syncJobs = snapshot.val();

    syncJobs &&
      Object.entries(syncJobs).forEach(([key, job]) => {
        const parsedJob = syncJobRecordSchema.parse(job);
        const current: SyncJobTuple = [key, parsedJob];

        callback({ current, database, previous, userId });

        previous = [key, parsedJob];
      });
  });
}

export function handleSyncJob({
  current,
  database,
  previous,
  userId,
}: {
  current: SyncJobTuple;
  database: Database;
  previous: SyncJobTuple;
  userId: string;
}) {
  const [currentKey, currentJob] = current;
  const [, previousJob] = previous;

  if (currentKey && currentJob) {
    const isReading = currentJob?.stage === SyncStage.reading;
    const isPaused = currentJob?.paused;
    const isActive = !isPaused && isReading;
    const isFirstPage = !currentJob.nextPageToken;
    const isNewPage = isFirstPage || currentJob?.nextPageToken !== previousJob?.nextPageToken;

    if (isActive && isFirstPage) {
      queueNextMediaItems({ database, jobId: currentKey, userId });
    } else if (isActive) {
      /**
       * TODO: Wait until the processing queue has no more 'ready' items,
       * then kick off the next batch
       */
    }
  }
}

export function startSyncJob({ database, jobId, userId }: { database: Database; jobId: string; userId: string }) {
  return updateSyncJob({ database, jobId, userId, updates: { [SyncJobKey.stage]: SyncStage.reading } });
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

export async function queueNextMediaItems({ database, jobId, userId }: QueueNextMediaItemsArgs) {
  const job = await localforage.getSyncJob(jobId);

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
        acc[getProcessingJobRefPath(userId, jobId, mediaItem.id)] = mediaItem;

        return acc;
      },
      {
        [`${syncJobRefPath}/${SyncJobKey.accessToken}`]: accessToken,
        [`${syncJobRefPath}/${SyncJobKey.accessTokenCreated}`]: accessTokenCreated,
        [`${syncJobRefPath}/${SyncJobKey.fileCount}`]: increment(count),
        [`${syncJobRefPath}/${SyncJobKey.importedCount}`]: increment(count),
        [`${syncJobRefPath}/${SyncJobKey.previousPageToken}`]: job.nextPageToken,
        [`${syncJobRefPath}/${SyncJobKey.nextPageToken}`]: nextPageToken,
        [`${syncJobRefPath}/${SyncJobKey.stage}`]: SyncStage.reading,
      } as Record<string, any>
    );

    await update(ref(database), updates);

    return localforage.updateSyncJob(jobId, {
      accessToken: accessToken,
      accessTokenCreated,
      fileCount: job.fileCount + count,
      importedCount: job.importedCount + count,
      nextPageToken: nextPageToken,
    });
  }
}
