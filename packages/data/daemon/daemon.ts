import { DirectoryAction } from './directory';
import { DownloadAction } from './download';
import { RawData } from 'ws';
import { WebSocket } from 'ws';
import short from 'short-uuid';
import { z } from 'zod';

export enum MessageType {
  ping = 'ping',
  directory = 'directory',
  download = 'download',
}

export const payloadSchema = z.object({
  action: z
    .enum([
      DirectoryAction.list,
      DirectoryAction.request,
      DirectoryAction.set,
      DownloadAction.init,
      DownloadAction.start,
      DownloadAction.pause,
      DownloadAction.cancel,
      DownloadAction.destroy,
      DownloadAction.addMediaItem,
    ])
    .optional(),
  error: z.string().optional(),
  data: z.any().optional(),
  text: z.string().optional(),
});

export const daemonMessage = z.object({
  created: z.number().default(() => Date.now()),
  isClient: z.boolean().default(() => typeof window === 'object'),
  isHeartbeat: z.boolean().default(false),
  payload: payloadSchema,
  success: z.boolean().default(true),
  type: z.nativeEnum(MessageType),
  uuid: z.string().default(() => short.uuid()),
});

export type Payload<T> = Omit<z.infer<typeof payloadSchema>, 'data'> & { data: T };
export type DaemonMessage = z.infer<typeof daemonMessage>;
export type DaemonMessages = DaemonMessage[];

export interface GetMessageArgs {
  isHeartbeat?: boolean;
  payload: DaemonMessage['payload'];
  success?: boolean;
  type: MessageType;
  uuid?: string;
}

export function decodeMessage(message: RawData) {
  return daemonMessage.parse(JSON.parse(message.toString('utf8')));
}

export function encodeMessage(args: GetMessageArgs) {
  const message = daemonMessage.parse(args);

  return { message, stringified: JSON.stringify(message) };
}

export function getSendMessage(ws: WebSocket) {
  return (message: GetMessageArgs) => {
    ws.send(encodeMessage(message).stringified);
  };
}
export type SendMessage = ReturnType<typeof getSendMessage>;

export const PORT = 8654;
