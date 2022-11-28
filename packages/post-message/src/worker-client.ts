/// <reference lib="webworker" />

import { GetMessageArgs, PostMessage, getMessage, postMessageSchema } from './schema';

declare let self: ServiceWorkerGlobalScope;

const NATIVE_EVENT_TYPES = new Set(['ping', 'keyChanged']);

export interface SendMessageToClientsArgs extends GetMessageArgs {
  expectResult?: boolean;
  ttlSeconds?: number;
}

export function initWorkerClient() {
  const pendingMessages: Map<string, (message: PostMessage) => void> = new Map();

  function listener(event: ExtendableMessageEvent) {
    const parsed = postMessageSchema.safeParse(event.data);
    const isNativeMessage = NATIVE_EVENT_TYPES.has(event.data.eventType);

    if (isNativeMessage) {
    } else if (parsed.success) {
      const { uuid } = parsed.data;
      const handler = pendingMessages.get(uuid);

      if (handler) {
        pendingMessages.delete(uuid);

        handler(parsed.data);
      }
    } else {
      console.warn('event failed to parse', event);
      console.error(parsed.error);
      throw new Error('Invalid message');
    }
  }

  function unsubscribe() {
    self.removeEventListener('message', listener);
  }

  self.addEventListener('message', listener);

  async function sendMessageToClients({
    expectResult,
    payload,
    success,
    ttlSeconds = 10,
    uuid,
  }: SendMessageToClientsArgs) {
    const message = getMessage({ payload, success, uuid });

    const clients = await self.clients.matchAll();

    clients.forEach((client) => {
      client.postMessage(message);
    });

    return expectResult
      ? new Promise<GetMessageArgs['payload']>((resolve, reject) => {
          let timedOut = false;

          const timer = setTimeout(() => {
            timedOut = true;

            reject(`Timeout of ${ttlSeconds} seconds exceeded`);
          }, ttlSeconds * 1000);

          pendingMessages.set(message.uuid, function handler(message) {
            if (timedOut) {
              const { payload, success } = message;

              clearTimeout(timer);
              success ? resolve(payload) : reject(payload);
            }
          });
        })
      : Promise.resolve({ data: { success: true } });
  }

  return { sendMessageToClients, unsubscribe };
}
