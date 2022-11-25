/// <reference lib="webworker" />

import { GetMessageArgs, getMessage, postMessageSchema } from './schema';

declare let self: ServiceWorkerGlobalScope;

interface SendMessageArgs extends GetMessageArgs {
  ttlSeconds?: number;
}

export function sendMessageToClients({ payload, success, ttlSeconds = 10, uuid }: SendMessageArgs) {
  const message = getMessage({ payload, success, uuid });

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(message);
    });
  });

  return new Promise<GetMessageArgs['payload']>((resolve, reject) => {
    const timer = setTimeout(() => {
      self.removeEventListener('message', listener);

      reject(`Timeout of ${ttlSeconds} seconds exceeded`);
    }, ttlSeconds * 1000);

    function listener(event: ExtendableMessageEvent) {
      const parsed = postMessageSchema.safeParse(event.data);

      if (parsed.success) {
        const { uuid: incomingUuid, payload: incomingPayload, success: incomingSuccess } = parsed.data;

        if (incomingUuid === message.uuid) {
          incomingSuccess ? resolve(incomingPayload) : reject(incomingPayload);
        }
      } else if (event.data.uuid === message.uuid) {
        reject(parsed.error);
      }

      if (event.data.uuid === message.uuid) {
        clearTimeout(timer);
        self.removeEventListener('message', listener);
      }
    }

    self.addEventListener('message', listener);
  });
}
