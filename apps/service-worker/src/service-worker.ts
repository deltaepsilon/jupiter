/// <reference lib="webworker" />

import {
  ClientMessageType,
  SwMessageType,
  SyncTaskAction,
  SyncTaskMessage,
  SyncTaskStatusMessage,
  parseSwMessage,
  queueRefsMessageSchema,
  syncTaskStatusMessageSchema,
} from 'data/service-worker';
import { StartSyncTaskResult, startSyncTask } from './sync-task';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

import { TaskState } from '@quiver/firebase-queue';
import { WEB } from 'data/web';
import { getDatabase } from 'firebase/database';
import { getPath } from 'ui/utils';
import { initializeApp } from 'firebase/app';
import { sendMessageToClients } from './utils/send-message-to-client';

declare let self: ServiceWorkerGlobalScope;

const app = initializeApp(WEB.FIREBASE, WEB.FIREBASE.APP_NAME);
const database = getDatabase(app);
const unsubscribers: (() => void)[] = [];
let syncTaskResult: StartSyncTaskResult | null = null;

let user: User | null = null;
onAuthStateChanged(getAuth(app), async (u) => {
  user = u;
});

self.addEventListener('install', function (event) {
  console.info('Service worker installing...', event);
});

self.addEventListener('message', function (event: ExtendableMessageEvent) {
  const data = parseSwMessage(event.data.type, event.data);

  if (!data) {
    console.error(event.data);
    throw new Error('Invalid message');
  } else {
    switch (data.type) {
      case SwMessageType.syncTask:
        return handleSyncTaskMessage(data);
    }
  }
});

async function handleSyncTaskMessage(data: SyncTaskMessage) {
  if (!user) {
    throw new Error('User not logged in');
  }

  switch (data.action) {
    case SyncTaskAction.status: {
      sendMessageToClients(
        syncTaskStatusMessageSchema.parse({ isActive: !!syncTaskResult, type: ClientMessageType.syncTaskStatus })
      );

      break;
    }

    case SyncTaskAction.start: {
      if (syncTaskResult) {
        syncTaskResult.queue.start();
      } else {
        syncTaskResult = await startSyncTask({ database, taskId: data.taskId, userId: user.uid });
        unsubscribers.push(syncTaskResult.unsubscribe);
      }

      break;
    }

    case SyncTaskAction.stop: {
      if (syncTaskResult) {
        await syncTaskResult.queue.stop();
      } else {
        throw new Error('Sync task not started');
      }

      break;
    }

    case SyncTaskAction.empty: {
      if (syncTaskResult) {
        await syncTaskResult.queue.empty();
      } else {
        throw new Error('Sync task not started');
      }

      break;
    }

    case SyncTaskAction.requeue: {
      if (syncTaskResult) {
        await syncTaskResult.queue.requeueByState(TaskState.error);
      } else {
        throw new Error('Sync task not started');
      }

      break;
    }

    case SyncTaskAction.getRefs: {
      if (syncTaskResult) {
        sendMessageToClients(
          queueRefsMessageSchema.parse({
            metadataRefPath: getPath(syncTaskResult.queue.metadataRef),
            tasksRefPath: getPath(syncTaskResult.queue.tasksRef),
            type: ClientMessageType.queueRefs,
          })
        );
      } else {
        throw new Error('Sync task not started');
      }

      break;
    }
  }
}
