import { ServiceWorkerMessage, SyncJobAction } from 'data/service-worker';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { handleSyncJob, listenToSyncJobs, startSyncJob } from './sync-jobs';

import { WEB } from 'data/web';
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const app = initializeApp(WEB.FIREBASE, WEB.FIREBASE.APP_NAME);
const database = getDatabase(app);
const unlisteners = [];

let user: User | null = null;
onAuthStateChanged(getAuth(app), async (u) => {
  user = u;

  if (user) {
    const unlistenSyncJobs = await listenToSyncJobs({ callback: handleSyncJob, database, userId: user.uid });

    unlisteners.push(unlistenSyncJobs);
  }
});

self.addEventListener('install', function (event) {
  console.log('Service worker installing...', event);
});

self.addEventListener('message', function (event) {
  const data = event.data as ServiceWorkerMessage;

  switch (data.type) {
    case 'syncJob':
      return handleSyncJobMessage(data);
  }
});

async function handleSyncJobMessage(data: ServiceWorkerMessage) {
  switch (data.action) {
    case SyncJobAction.start: {
      return user && startSyncJob({ database, jobId: data.jobId, userId: user.uid });
    }
  }
}
