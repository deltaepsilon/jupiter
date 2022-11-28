/// <reference lib="dom" />

import { GetMessageArgs, Payload, getMessage, postMessageSchema } from './schema';

export interface SendMessageToSwArgs extends GetMessageArgs {
  registration: ServiceWorkerRegistration;
  ttlSeconds?: number;
}

export function sendMessageToSw<T>({ payload, registration, success, ttlSeconds = 10, uuid }: SendMessageToSwArgs) {
  const message = getMessage({ payload, success, uuid });

  registration?.active?.postMessage(message);

  return new Promise<Payload<T>>((resolve, reject) => {
    const timer = setTimeout(() => {
      navigator.serviceWorker.removeEventListener('message', listener);

      reject(`Timeout of ${ttlSeconds} seconds exceeded`);
    }, ttlSeconds * 1000);

    function listener(event: MessageEvent) {
      const parsed = postMessageSchema.safeParse(event.data);

      if (parsed.success) {
        const { uuid: incomingUuid, payload: incomingPayload, success: incomingSuccess } = parsed.data;

        if (incomingUuid === message.uuid) {
          incomingSuccess ? resolve(incomingPayload as Payload<T>) : reject(incomingPayload as Payload<T>);
        }
      } else if (event.data.uuid === message.uuid) {
        reject(parsed.error);
      }

      if (event.data.uuid === message.uuid) {
        clearTimeout(timer);
        navigator.serviceWorker.removeEventListener('message', listener);
      }
    }

    navigator.serviceWorker.addEventListener('message', listener);
  });
}
