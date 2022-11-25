/// <reference lib="webworker" />

import { ClientMessage } from 'data/service-worker';

declare let self: ServiceWorkerGlobalScope;

export function sendMessageToClients(message: ClientMessage) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(message);
    });
  });
}
