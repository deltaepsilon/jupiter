/// <reference lib="dom" />

import { GetMessageArgs, getMessage, postMessageSchema } from './schema';

interface SendMessageArgs extends GetMessageArgs {
  registration: ServiceWorkerRegistration;
  ttlSeconds?: number;
}

export function sendMessageToSw({ payload, registration, success, ttlSeconds = 10, uuid }: SendMessageArgs) {
  const message = getMessage({ payload, success, uuid });

  registration?.active?.postMessage(message);

  return new Promise<GetMessageArgs['payload']>((resolve, reject) => {
    const timer = setTimeout(() => {
      window.removeEventListener('message', listener);

      reject(`Timeout of ${ttlSeconds} seconds exceeded`);
    }, ttlSeconds * 1000);

    function listener(event: MessageEvent) {
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
        window.removeEventListener('message', listener);
      }
    }

    window.addEventListener('message', listener);
  });
}
