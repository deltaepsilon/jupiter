/// <reference lib="webworker" />

import {
  AckMessage,
  MessageAction,
  SyncGetRefsMessage,
  SyncStatusMessage,
  decodePostMessage,
  encodePostMessage,
  syncTaskMessageSchema,
} from 'data/service-worker';
import { StartSyncTaskResult, startSyncTask } from './sync-task';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

import { TaskState } from '@quiver/firebase-queue';
import { WEB } from 'data/web';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore/lite';
import { getPath } from 'ui/utils';
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
  console.info('Service worker installing..', event);
});

self.addEventListener('message', async function (event: ExtendableMessageEvent) {
  if (NATIVE_EVENT_TYPES.has(event.data.eventType)) {
    return;
  }

  const userId = user?.uid;
  const message = decodePostMessage(event.data);
  const uuid = message.uuid;

  switch (message.action) {
    case MessageAction.libraryImportInit:
    case MessageAction.libraryImportStart:
    case MessageAction.libraryImportPause:
    case MessageAction.libraryImportCancel:
    case MessageAction.libraryImportDestroy:
      if (!user) throw new Error('User not found');

      return handleLibraryImportMessage({ ack, database, db, message, user });

    case MessageAction.syncGetRefs: {
      const { syncTask } = getSyncTask(message.data);

      return sendMessageToClients(
        encodePostMessage<SyncGetRefsMessage>({
          action: MessageAction.syncGetRefs,
          data: {
            metadataRefPath: getPath(syncTask.queue.metadataRef),
            tasksRefPath: getPath(syncTask.queue.tasksRef),
          },
          uuid,
        })
      );
    }

    case MessageAction.syncStatus: {
      const { taskId } = message.data as SyncStatusMessage;
      const syncTaskResult = syncTasksMap.get(taskId);

      return sendMessageToClients(
        encodePostMessage<SyncStatusMessage>({
          action: MessageAction.syncStatus,
          data: { taskId, isActive: !!syncTaskResult },
          uuid,
        })
      );
    }

    case MessageAction.syncStart: {
      const { syncTask, taskId } = getSyncTask(message.data);

      if (syncTask) {
        syncTask.queue.start();
      } else if (userId) {
        const result = await startSyncTask({ database, taskId, userId });

        unsubscribers.push(result.unsubscribe);
        syncTasksMap.set(taskId, result);
      }

      return ack(uuid);
    }

    case MessageAction.syncStop: {
      const { syncTask } = getSyncTask(message.data);

      await syncTask.queue.stop();

      return ack(uuid);
    }

    case MessageAction.syncEmpty: {
      const { syncTask } = getSyncTask(message.data);

      await syncTask.queue.empty();

      return ack(uuid);
    }

    case MessageAction.syncRequeue: {
      const { syncTask } = getSyncTask(message.data);

      await syncTask.queue.requeueByState(TaskState.error);

      return ack(uuid);
    }

    default:
      console.warn('Unhandled message', message);
      return;
  }
});

function getSyncTask(syncTaskMessage: unknown) {
  const { taskId } = syncTaskMessageSchema.parse(syncTaskMessage);
  const syncTask = syncTasksMap.get(taskId);

  if (syncTask) {
    return { syncTask, taskId };
  } else {
    throw new Error('Sync task not started');
  }
}

function ack(uuid: string, data = true) {
  sendMessageToClients(encodePostMessage<AckMessage>({ action: MessageAction.ack, data, uuid }));
}
