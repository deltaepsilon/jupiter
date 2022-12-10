import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

console.log('hello world');

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.send('Hi there, I am a WebSocket server');
});
