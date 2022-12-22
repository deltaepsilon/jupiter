import { MessageType, PORT, decodeMessage, encodeMessage } from 'data/daemon';
import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws) => {
  ws.on('message', (m) => {
    const message = decodeMessage(m);

    switch (message.type) {
      case MessageType.ping:
        return sendPing(ws, 'pong');

      default:
        console.error('unhandled message', message);
        break;
    }
  });

  sendPing(ws);
});

function sendPing(ws: WebSocket, data = 'ping') {
  ws.send(encodeMessage({ payload: { data }, type: MessageType.ping }).stringified);
}
