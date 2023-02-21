import {
  DaemonMessage,
  GetMessageArgs,
  MessageType,
  PORT,
  SendMessage,
  decodeMessage,
  encodeMessage,
} from 'data/daemon';
import { WebSocket, WebSocketServer } from 'ws';
import { handleDirectory, requestDirectory } from './directory/handle-directory';
import { versionCheck } from './version-check';

import { FilesystemDatabase } from 'daemon/src/db';
import { handleDownload } from './download/handle-download';
import { handleFolderMessage } from './folder';

// import { debug } from './debug';
// debug();

versionCheck().then((isFresh) => {
  if (isFresh) {
    connect();
  } else {
    console.log('Version check failed');

    setTimeout(() => console.log('Version check failed'), 1000 * 60);
  }
});

function connect() {
  const wss = new WebSocketServer({ port: PORT });

  console.info(`Listening on port ${PORT}...`);

  wss.on('connection', async (ws) => {
    const sendMessage = getSendMessage(ws);
    let db: FilesystemDatabase | null = null;

    ws.on('message', async (m) => {
      const message = decodeMessage(m);

      switch (message.type) {
        case MessageType.ping:
          return sendPing(sendMessage, message);

        case MessageType.directory: {
          const result = await handleDirectory({ message, sendMessage });

          if (result?.isDb) {
            db = result;
          }
          break;
        }

        case MessageType.download:
          if (!db) {
            return sendMessage({
              type: MessageType.download,
              payload: { error: 'Filesystem database not initialized' },
            });
          } else {
            return handleDownload({ db, message, sendMessage });
          }

        case MessageType.folder:
          if (!db) {
            return sendMessage({ type: MessageType.folder, payload: { error: 'Filesystem database not initialized' } });
          } else {
            return handleFolderMessage({ db, message, sendMessage });
          }

        default:
          console.error('unhandled message', message);
          break;
      }
    });

    sendPing(sendMessage);
    requestDirectory(sendMessage);
  });
}

function getSendMessage(ws: WebSocket) {
  return (message: GetMessageArgs) => {
    ws.send(encodeMessage(message).stringified);
  };
}

function sendPing(sendMessage: SendMessage, message?: DaemonMessage) {
  if (message) {
    const { isHeartbeat, uuid } = message;

    sendMessage({ isHeartbeat, payload: { text: 'pong' }, type: MessageType.ping, uuid });
  } else {
    sendMessage({ payload: { text: 'ping' }, type: MessageType.ping });
  }
}
