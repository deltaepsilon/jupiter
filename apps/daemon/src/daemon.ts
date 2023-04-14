import {
  DaemonMessage,
  DownloadAction,
  GetMessageArgs,
  MessageType,
  PORT,
  SendMessage,
  decodeMessage,
  downloadMessageDataSchema,
  downloadStateSchema,
  encodeMessage,
} from 'data/daemon';
import { WebSocket, WebSocketServer } from 'ws';
import { handleDirectory, requestDirectory } from './directory/handle-directory';

import { LevelDatabase } from 'daemon/src/level';
import { WEB } from 'data/web';
import { handleDownload } from './download/handle-download';
import { handleFolderMessage } from './folder';
import { versionCheck } from './version-check';

process.on('uncaughtException', function (error) {
  console.error(error);
  if (process.send) {
    process.send({ error });
  }

  process.exit(1);
});

// import { debug } from './debug';
// debug();

versionCheck().then((isFresh) => {
  if (isFresh) {
    console.info('\n🤖 Control panel:', WEB.URLS.WEB);
    connect();
  } else {
    console.info('📛 Version check failed');
    console.info('💾 Download latest:', WEB.URLS.DOWNLOADS);
    console.info('\n Running old version of daemon. \n Behavior may be unpredictable. \n Expect bugs.');

    connect();
  }
});

function connect() {
  const host = '127.0.0.1';
  const wss = new WebSocketServer({ host, port: PORT });

  console.info(`\nListening on  ${host}:${PORT}...`);

  wss.on('connection', async (ws) => {
    const sendMessage = getSendMessage(ws);
    let db: LevelDatabase | null = null;

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
            const { libraryId } = downloadMessageDataSchema.parse(message.payload.data);
            requestDirectory(sendMessage);

            return sendMessage({
              type: MessageType.download,
              payload: {
                data: downloadMessageDataSchema.parse({
                  libraryId,
                  state: downloadStateSchema.parse({
                    isPaused: true,
                    text: 'Filesystem database not initialized. Pausing.',
                  }),
                }),
                error: 'Filesystem database not initialized. Try re-selecting your folder.',
              },
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

    !isHeartbeat && console.info('pong');

    sendMessage({ isHeartbeat, payload: { text: 'pong' }, type: MessageType.ping, uuid });
  } else {
    sendMessage({ payload: { text: 'ping' }, type: MessageType.ping });
  }
}
