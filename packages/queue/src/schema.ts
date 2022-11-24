import { z } from 'zod';

export enum QueueKey {
  logs = 'logs',
  metadata = 'metadata',
  task = 'task',
}

export enum MetadataKey {
  isPaused = 'isPaused',
  count = 'count',
  errorCount = 'errorCount',
  waitingCount = 'waitingCount',
  activeCount = 'activeCount',
  completeCount = 'completeCount',
}

export const metadataSchema = z.object({
  [MetadataKey.isPaused]: z.boolean().optional(),
  [MetadataKey.count]: z.number().int().optional(),
  [MetadataKey.errorCount]: z.number().int().optional(),
  [MetadataKey.waitingCount]: z.number().int().optional(),
  [MetadataKey.activeCount]: z.number().int().optional(),
  [MetadataKey.completeCount]: z.number().int().optional(),
});

export type QueueMetadata = z.infer<typeof metadataSchema>;

export enum TaskKey {
  state = 'state',
  message = 'message',
  data = 'data',
  created = 'created',
  started = 'started',
  errored = 'errored',
  completed = 'completed',
}

export enum TaskState {
  error = 'error',
  waiting = 'waiting',
  active = 'active',
  complete = 'complete',
}

export const taskSchema = z.object({
  [TaskKey.state]: z.nativeEnum(TaskState),
  [TaskKey.message]: z.string().optional(),
  [TaskKey.data]: z.any(),
  [TaskKey.created]: z.number(),
  [TaskKey.started]: z.number().optional().nullable(),
  [TaskKey.errored]: z.number().optional().nullable(),
  [TaskKey.completed]: z.number().optional().nullable(),
});

export type QueueTask = z.infer<typeof taskSchema>;
export type QueueTasks = Record<string, QueueTask>;

export type Callback = (data: QueueTasks) => Promise<{ success: boolean; message: string }>;

export enum LogKey {
  task = 'task',
  errors = 'errors',
}

export const errorSchema = z.object({ created: z.date(), message: z.string() });
export const logSchema = z.object({ task: taskSchema, errors: z.record(z.string(), errorSchema) });
export type QueueLog = z.infer<typeof logSchema>;
