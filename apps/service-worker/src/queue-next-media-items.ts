import { Database, increment, ref, update } from 'firebase/database';
import { SyncJobKey, SyncStage, getSyncJobRefPath } from 'data/sync';
import { addParams, localforage } from 'ui/utils';

import { User } from 'firebase/auth';
import { WEB } from 'data/web';
import { getProcessingJobRefPath } from 'data/processing';
import { mediaItemsResponseSchema } from 'data/media-items';

const ONE_HOUR_IN_MS = 3600000;

interface Args {
  database: Database;
  jobId: string;
  user: User | null;
}

export async function queueNextMediaItems({ database, jobId, user }: Args) {
  const job = await localforage.getSyncJob(jobId);
  const userId = user?.uid;

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
