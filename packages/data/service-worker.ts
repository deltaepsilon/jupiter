import { metadataSchema } from '@quiver/firebase-queue';
import { z } from 'zod';

export enum SwMessageType {
  syncTask = 'syncTask',
}

// ********** Service Worker Message Types
export enum SyncTaskAction {
  status = 'status',
  start = 'start',
  stop = 'stop',
  empty = 'empty',
  requeue = 'requeue',
  getRefs = 'getRefs',
}

export const syncTaskMessageSchema = z.object({
  taskId: z.string(),
  action: z.nativeEnum(SyncTaskAction),
  type: z.enum([SwMessageType.syncTask]),
});

export type SyncTaskMessage = z.infer<typeof syncTaskMessageSchema>;
export type ServiceWorkerMessage = SyncTaskMessage;

// ********** Client Message Types
export enum ClientMessageType {
  ack = 'ack',
  syncTaskStatus = 'syncTaskStatus',
  queueRefs = 'queueRefs',
}

/**
 * TODO:
 * Create a synchronous message type
 * These messages will be call/response
 */

export const ackMessageSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  type: z.enum([ClientMessageType.ack]),
});

export const syncTaskStatusMessageSchema = z.object({
  isActive: z.boolean(),
  type: z.enum([ClientMessageType.syncTaskStatus]),
});

export const queueRefsMessageSchema = z.object({
  metadataRefPath: z.string(),
  tasksRefPath: z.string(),
  type: z.enum([ClientMessageType.queueRefs]),
});

export type AckMessage = z.infer<typeof ackMessageSchema>;
export type SyncTaskStatusMessage = z.infer<typeof syncTaskStatusMessageSchema>;
export type QueueRefsMessage = z.infer<typeof queueRefsMessageSchema>;
export type ClientMessage = AckMessage | QueueRefsMessage | SyncTaskStatusMessage;

// ********** Functions
export function parseSwMessage(type: string, message: unknown): ServiceWorkerMessage | false {
  switch (type) {
    case SwMessageType.syncTask:
      return syncTaskMessageSchema.parse(message);

    default:
      return false;
  }
}

export function parseClientMessage(type: string, message: unknown): ClientMessage | false {
  switch (type) {
    case ClientMessageType.syncTaskStatus:
      return syncTaskStatusMessageSchema.parse(message);

    case ClientMessageType.queueRefs:
      return queueRefsMessageSchema.parse(message);

    default:
      return false;
  }
}
