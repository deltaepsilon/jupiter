import { DataSnapshot, getDatabase, increment, onValue, push, ref, remove, set, update } from 'firebase/database';
import { FirebaseError, getApp, initializeApp } from 'firebase/app';
import { MessageType, ServiceWorkerMessage, SyncJobAction } from 'data/service-worker';
import { SyncJobKey, SyncStage, getSyncJobRefPath } from 'data/sync';
import { User, getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';
import { addParams, localforage } from 'ui/utils';

import { WEB } from 'data/web';
import { getProcessingJobRefPath } from 'data/processing';
import { mediaItemsResponseSchema } from 'data/media-items';

const ONE_HOUR_IN_MS = 3600000;

const app = initializeApp(WEB.FIREBASE, WEB.FIREBASE.APP_NAME);
const database = getDatabase(app);

let user: User | null = null;
onAuthStateChanged(getAuth(app), async (u) => (user = u));

self.addEventListener('install', function (event) {
  console.log('Service worker installing...', event);
});

self.addEventListener('message', function (event) {
  const data = event.data as ServiceWorkerMessage;

  switch (data.type) {
    case 'syncJob':
      return handleSyncJob(data);
  }
});

// TODO: Create app logo

async function handleSyncJob(data: ServiceWorkerMessage) {
  switch (data.action) {
    case SyncJobAction.start: {
      return startSyncJob(data.jobId);
    }
  }
}

async function startSyncJob(jobId: string) {
  const nextJob = await queueNextMediaItems(jobId);

  console.log({ nextJob });
}

async function queueNextMediaItems(jobId: string) {
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
