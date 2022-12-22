import { RawData } from 'ws';
import { decodePostMessage } from './service-worker';
import short from 'short-uuid';
import { z } from 'zod';

export enum MessageType {
  ping = 'ping',
}

export const payloadSchema = z.object({ error: z.string().optional(), data: z.any().optional() });

export const daemonMessage = z.object({
  created: z.number().default(() => Date.now()),
  isClient: z.boolean().default(() => typeof window === 'object'),
  payload: payloadSchema,
  success: z.boolean().default(true),
  type: z.nativeEnum(MessageType),
  uuid: z.string().default(() => short.uuid()),
});

export type Payload<T> = Omit<z.infer<typeof payloadSchema>, 'data'> & { data: T };
export type DaemonMessage = z.infer<typeof daemonMessage>;
export type DaemonMessages = DaemonMessage[];

export interface GetMessageArgs {
  payload: DaemonMessage['payload'];
  success?: boolean;
  type: MessageType;
  uuid?: string;
}

export function decodeMessage(message: RawData) {
  return daemonMessage.parse(JSON.parse(message.toString('utf8')));
}

export function encodeMessage({ payload, success, type, uuid }: GetMessageArgs) {
  const message = daemonMessage.parse({ payload, success, type, uuid });

  return { message, stringified: JSON.stringify(message) };
}

export const PORT = 8654;
