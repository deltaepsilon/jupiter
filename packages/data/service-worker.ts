import { GetMessageArgs, postMessageSchema } from '@quiver/post-message';

import { z } from 'zod';

const ackMessageSchema = z.boolean();

export const libraryMessageSchema = z.object({
  libraryId: z.string(),
});

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
export type LibraryMessage = z.infer<typeof libraryMessageSchema>;
export type SyncTaskMessage = z.infer<typeof syncTaskMessageSchema>;
export type SyncStatusMessage = z.infer<typeof syncStatusMessageSchema>;
export type SyncGetRefsMessage = z.infer<typeof syncGetRefsMessageSchema>;

export enum MessageAction {
  ack = 'ack',

  libraryImportInit = 'libraryImportInit',
  libraryImportStart = 'libraryImportStart',
  libraryImportPause = 'libraryImportPause',
  libraryImportCancel = 'libraryImportCancel',
  libraryImportDestroy = 'libraryImportDestroy',

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
type Data = LibraryMessage | SyncTaskMessage | SyncStatusMessage | SyncGetRefsMessage | false;

const postMessageBaseSchema = z.object({ error: z.string().optional(), uuid: z.string() });
export const messageSchemasByAction = {
  [MessageAction.syncStatus]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.syncStatus),
    data: syncStatusMessageSchema,
  }),
  [MessageAction.libraryImportInit]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.libraryImportInit),
    data: libraryMessageSchema,
  }),
  [MessageAction.libraryImportStart]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.libraryImportStart),
    data: libraryMessageSchema,
  }),
  [MessageAction.libraryImportPause]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.libraryImportPause),
    data: libraryMessageSchema,
  }),
  [MessageAction.libraryImportCancel]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.libraryImportCancel),
    data: libraryMessageSchema,
  }),
  [MessageAction.libraryImportDestroy]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.libraryImportDestroy),
    data: libraryMessageSchema,
  }),
  [MessageAction.syncGetRefs]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.syncGetRefs),
    data: syncGetRefsMessageSchema,
  }),
  [MessageAction.syncStart]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.syncStart),
    data: syncTaskMessageSchema,
  }),
  [MessageAction.syncStop]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.syncStop),
    data: syncTaskMessageSchema,
  }),
  [MessageAction.syncEmpty]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.syncEmpty),
    data: syncTaskMessageSchema,
  }),
  [MessageAction.syncRequeue]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.syncRequeue),
    data: syncTaskMessageSchema,
  }),
};
const discriminatedMessageSchema = z.discriminatedUnion('action', [
  messageSchemasByAction[MessageAction.syncStatus],
  messageSchemasByAction[MessageAction.libraryImportInit],
  messageSchemasByAction[MessageAction.libraryImportStart],
  messageSchemasByAction[MessageAction.libraryImportPause],
  messageSchemasByAction[MessageAction.libraryImportCancel],
  messageSchemasByAction[MessageAction.libraryImportDestroy],
  messageSchemasByAction[MessageAction.syncGetRefs],
  messageSchemasByAction[MessageAction.syncStart],
  messageSchemasByAction[MessageAction.syncStop],
  messageSchemasByAction[MessageAction.syncEmpty],
  messageSchemasByAction[MessageAction.syncRequeue],
]);

export function decodePostMessage(message: unknown) {
  const { payload, uuid } = postMessageSchema.parse(message);
  const { data, error } = payload;
  const action = messageActionSchema.parse(data.action);

  return discriminatedMessageSchema.parse({ action, data, error, uuid });
}

export type Ack = (uuid: string, success?: boolean) => void;
