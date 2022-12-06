/// <reference lib="webworker" />

import { AckMessage, MessageAction, decodePostMessage, encodePostMessage } from 'data/service-worker';
import { StartSyncTaskResult, startSyncTask } from './sync-task';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

import { WEB } from 'data/web';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore/lite';
import { handleLibraryDownloadMessage } from './library-download';
import { handleLibraryImportMessage } from './library-import';
import { initWorkerClient } from '@quiver/post-message';
import { initializeApp } from 'firebase/app';

declare let self: ServiceWorkerGlobalScope;

const app = initializeApp(WEB.FIREBASE, WEB.FIREBASE.APP_NAME);
const database = getDatabase(app);
const db = getFirestore(app);
const unsubscribers: (() => void)[] = [];
const syncTasksMap: Map<string, StartSyncTaskResult> = new Map();
const { sendMessageToClients } = initWorkerClient();
const NATIVE_EVENT_TYPES = new Set(['ping', 'keyChanged']);

let user: User | null = null;
onAuthStateChanged(getAuth(app), async (u) => {
  user = u;
});

self.addEventListener('install', function (event) {
  console.info('Service worker installing... ', event);
});

self.addEventListener('message', async function (event: ExtendableMessageEvent) {
  if (NATIVE_EVENT_TYPES.has(event.data.eventType)) {
    return;
  }

  const message = decodePostMessage(event.data);

  switch (message.action) {
    case MessageAction.libraryImportInit:
    case MessageAction.libraryImportStart:
    case MessageAction.libraryImportPause:
    case MessageAction.libraryImportCancel:
    case MessageAction.libraryImportDestroy:
      if (!user) throw new Error('User not found');

      await handleLibraryImportMessage({ database, db, message, user });

      return ack(message.uuid);

    case MessageAction.libraryDownloadInit:
    case MessageAction.libraryDownloadStart:
    case MessageAction.libraryDownloadPause:
    case MessageAction.libraryDownloadCancel:
    case MessageAction.libraryDownloadDestroy:
      if (!user) throw new Error('User not found');

      await handleLibraryDownloadMessage({ database, db, message, user });

      return ack(message.uuid);

    default:
      console.warn('Unhandled message', message);
      return;
  }
});

function ack(uuid: string, data = true) {
  sendMessageToClients(encodePostMessage<AckMessage>({ action: MessageAction.ack, data, uuid }));
}
