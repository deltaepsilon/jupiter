import { GetMessageArgs, postMessageSchema } from '@quiver/post-message';

import { z } from 'zod';

const ackMessageSchema = z.boolean();

const syncStatusMessageSchema = z.object({
  taskId: z.string(),
  isActive: z.boolean().optional(),
});

const syncGetRefsMessageSchema = z.object({
  metadataRefPath: z.string(),
  tasksRefPath: z.string(),
});

export const syncTaskMessageSchema = z.object({
  taskId: z.string(),
});

export type AckMessage = z.infer<typeof ackMessageSchema>;
export type SyncTaskMessage = z.infer<typeof syncTaskMessageSchema>;
export type SyncStatusMessage = z.infer<typeof syncStatusMessageSchema>;
export type SyncGetRefsMessage = z.infer<typeof syncGetRefsMessageSchema>;

export enum MessageAction {
  ack = 'ack',
  syncStatus = 'syncStatus',
  syncStart = 'syncStart',
  syncStop = 'syncStop',
  syncEmpty = 'syncEmpty',
  syncRequeue = 'syncRequeue',
  syncGetRefs = 'syncGetRefs',
  syncTaskStatus = 'syncTaskStatus',
  syncQueueRefs = 'syncQueueRefs',
}
interface EncodePostMessageArgs<Data> extends Pick<GetMessageArgs, 'uuid'> {
  error?: string;
  data?: Data;
  action: MessageAction;
}

export function encodePostMessage<Data>({ action, data, error, uuid }: EncodePostMessageArgs<Data>) {
  const payload = { error, data: { action, ...data } };

  return postMessageSchema.parse({
    payload,
    success: !error,
    uuid,
  });
}

const messageActionSchema = z.nativeEnum(MessageAction);
type Data = SyncTaskMessage | SyncStatusMessage | SyncGetRefsMessage | false;

export function decodePostMessage(message: unknown): {
  action: MessageAction;
  data: Data;
  error?: string;
  uuid: string;
} {
  const { payload, uuid } = postMessageSchema.parse(message);
  const { data, error } = payload;
  const action = messageActionSchema.parse(data.action);

  switch (action) {
    case MessageAction.syncStatus:
      return { action, data: syncStatusMessageSchema.parse(data), error, uuid };

    case MessageAction.syncGetRefs:
      return { action, data: syncGetRefsMessageSchema.parse(data), error, uuid };

    case MessageAction.syncStart:
    case MessageAction.syncStop:
    case MessageAction.syncEmpty:
    case MessageAction.syncRequeue:
      return { action, data: syncTaskMessageSchema.parse(data), error, uuid };

    default:
      return { action, data: false, error, uuid };
  }
}
