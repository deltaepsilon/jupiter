import { DataSnapshot, getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { MessageType, ServiceWorkerMessage, SyncJobAction } from 'data/service-worker';
import { User, getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';
import { getApp, initializeApp } from 'firebase/app';

import { WEB } from 'data/web';
import { localforage } from 'ui/utils';

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
  const job = await localforage.getSyncJob(jobId);
  console.log('start sync job', job);
}
