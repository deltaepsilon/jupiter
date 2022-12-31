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
import { directory, requestDirectory } from './directory';

import { FilesystemDatabase } from 'daemon/src/db';
import { download } from './download';

const wss = new WebSocketServer({ port: PORT });

wss.on('connection', async (ws) => {
  const sendMessage = getSendMessage(ws);
  let db: FilesystemDatabase | null = null;

  ws.on('message', async (m) => {
    const message = decodeMessage(m);

    switch (message.type) {
      case MessageType.ping:
        return sendPing(sendMessage, message);

      case MessageType.directory: {
        const result = await directory({ message, sendMessage });

        if (result?.isDb) {
          db = result;
        }
        break;
      }

      case MessageType.download:
        if (!db) {
          return sendMessage({ type: MessageType.download, payload: { error: 'Filesystem database not initialized' } });
        } else {
          return download({ db, message, sendMessage });
        }

      default:
        console.error('unhandled message', message);
        break;
    }
  });

  sendPing(sendMessage);
  requestDirectory(sendMessage);
});

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
