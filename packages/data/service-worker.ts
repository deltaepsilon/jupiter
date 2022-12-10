import { GetMessageArgs, postMessageSchema } from '@jupiter/post-message';

import { z } from 'zod';

const ackMessageSchema = z.boolean();

export const libraryMessageSchema = z.object({
  libraryId: z.string(),
});

export const libraryFileMessageSchema = libraryMessageSchema.extend({
  directoryHandle: z.any().refine((value) => value instanceof FileSystemDirectoryHandle, {
    message: 'directoryHandle must be an instance of FileSystemDirectoryHandle',
  }),
});

export type AckMessage = z.infer<typeof ackMessageSchema>;
export type LibraryMessage = z.infer<typeof libraryMessageSchema>;

export enum MessageAction {
  ack = 'ack',

  libraryImportInit = 'libraryImportInit',
  libraryImportStart = 'libraryImportStart',
  libraryImportPause = 'libraryImportPause',
  libraryImportCancel = 'libraryImportCancel',
  libraryImportDestroy = 'libraryImportDestroy',

  libraryDownloadInit = 'libraryDownloadInit',
  libraryDownloadStart = 'libraryDownloadStart',
  libraryDownloadPause = 'libraryDownloadPause',
  libraryDownloadCancel = 'libraryDownloadCancel',
  libraryDownloadDestroy = 'libraryDownloadDestroy',
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

const postMessageBaseSchema = z.object({ error: z.string().optional(), uuid: z.string() });
export const messageSchemasByAction = {
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

  [MessageAction.libraryDownloadInit]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.libraryDownloadInit),
    data: libraryFileMessageSchema,
  }),
  [MessageAction.libraryDownloadStart]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.libraryDownloadStart),
    data: libraryFileMessageSchema,
  }),
  [MessageAction.libraryDownloadPause]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.libraryDownloadPause),
    data: libraryFileMessageSchema,
  }),
  [MessageAction.libraryDownloadCancel]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.libraryDownloadCancel),
    data: libraryFileMessageSchema,
  }),
  [MessageAction.libraryDownloadDestroy]: postMessageBaseSchema.extend({
    action: z.literal(MessageAction.libraryDownloadDestroy),
    data: libraryFileMessageSchema,
  }),
};
const discriminatedMessageSchema = z.discriminatedUnion('action', [
  messageSchemasByAction[MessageAction.libraryImportInit],
  messageSchemasByAction[MessageAction.libraryImportStart],
  messageSchemasByAction[MessageAction.libraryImportPause],
  messageSchemasByAction[MessageAction.libraryImportCancel],
  messageSchemasByAction[MessageAction.libraryImportDestroy],

  messageSchemasByAction[MessageAction.libraryDownloadInit],
  messageSchemasByAction[MessageAction.libraryDownloadStart],
  messageSchemasByAction[MessageAction.libraryDownloadPause],
  messageSchemasByAction[MessageAction.libraryDownloadCancel],
  messageSchemasByAction[MessageAction.libraryDownloadDestroy],
]);

export function decodePostMessage(message: unknown) {
  const { payload, uuid } = postMessageSchema.parse(message);
  const { data, error } = payload;
  const action = messageActionSchema.parse(data.action);

  return discriminatedMessageSchema.parse({ action, data, error, uuid });
}

export type Ack = (uuid: string, success?: boolean) => void;
