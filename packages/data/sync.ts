import { z } from 'zod';

export enum Cookie {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
}

export enum SyncTaskKey {
  accessToken = 'accessToken',
  accessTokenCreated = 'accessTokenCreated',
  refreshToken = 'refreshToken',
  taskName = 'taskName',
  directoryHandle = 'directoryHandle',
  directoryName = 'directoryName',
  created = 'created',
  fileCount = 'fileCount',
  importedCount = 'importedCount',
  processedCount = 'processedCount',
  exportedCount = 'exportedCount',
  paused = 'paused',
  stage = 'stage',
  previousPageToken = 'previousPageToken',
  nextPageToken = 'nextPageToken',
}

export enum SyncStage {
  ready = 'ready',
  downloading = 'downloading',
}

export const syncTaskSchema = z.object({
  [SyncTaskKey.accessToken]: z.string(),
  [SyncTaskKey.accessTokenCreated]: z.number(),
  [SyncTaskKey.refreshToken]: z.string(),
  [SyncTaskKey.taskName]: z.string(),
  [SyncTaskKey.directoryHandle]: z
    .any()
    .refine((obj) => obj instanceof FileSystemDirectoryHandle, { message: 'Must be a FileSystemDirectoryHandle' }),
  [SyncTaskKey.fileCount]: z.number(),
  [SyncTaskKey.importedCount]: z.number(),
  [SyncTaskKey.processedCount]: z.number(),
  [SyncTaskKey.exportedCount]: z.number(),
  [SyncTaskKey.created]: z.date(),
  [SyncTaskKey.stage]: z.nativeEnum(SyncStage),
  [SyncTaskKey.paused]: z
    .boolean()
    .optional()
    .transform((val) => val ?? false),
  [SyncTaskKey.previousPageToken]: z.string().nullable().optional(),
  [SyncTaskKey.nextPageToken]: z.string().nullable().optional(),
});

export const syncTaskRecordSchema = z.object({
  [SyncTaskKey.accessToken]: z.string(),
  [SyncTaskKey.accessTokenCreated]: z.number(),
  [SyncTaskKey.refreshToken]: z.string(),
  [SyncTaskKey.taskName]: z.string(),
  [SyncTaskKey.fileCount]: z.number(),
  [SyncTaskKey.importedCount]: z.number(),
  [SyncTaskKey.processedCount]: z.number(),
  [SyncTaskKey.exportedCount]: z.number(),
  [SyncTaskKey.directoryName]: z.string(),
  [SyncTaskKey.created]: z.string(),
  [SyncTaskKey.stage]: z.nativeEnum(SyncStage),
  [SyncTaskKey.paused]: z
    .boolean()
    .optional()
    .transform((val) => val ?? false),
  [SyncTaskKey.previousPageToken]: z.string().nullable().optional(),
  [SyncTaskKey.nextPageToken]: z.string().nullable().optional(),
});

export type SyncTask = z.infer<typeof syncTaskSchema>;
export type SyncTaskRecord = z.infer<typeof syncTaskRecordSchema>;
export type SyncTaskRecordTuple = [string | null, SyncTaskRecord | null];
export type SyncTasks = Record<string, SyncTask>;
export type SyncTaskRecords = Record<string, SyncTaskRecord>;

export function serializeSyncTask(task: SyncTask): SyncTaskRecord {
  return syncTaskRecordSchema.parse({
    ...task,
    [SyncTaskKey.created]: task.created.toISOString(),
    [SyncTaskKey.directoryName]: task.directoryHandle.name,
  });
}

export function getSyncTasksRefPath(userId: string) {
  return `sync-tasks/${userId}`;
}

export function getSyncTaskRefPath({ taskId, userId }: { taskId: string; userId: string }) {
  return `${getSyncTasksRefPath(userId)}/${taskId}`;
}

export function getDefaultSyncTask(): SyncTask {
  return {
    [SyncTaskKey.accessToken]: '',
    [SyncTaskKey.accessTokenCreated]: Date.now(),
    [SyncTaskKey.refreshToken]: '',
    [SyncTaskKey.taskName]: '',
    [SyncTaskKey.fileCount]: 0,
    [SyncTaskKey.importedCount]: 0,
    [SyncTaskKey.processedCount]: 0,
    [SyncTaskKey.exportedCount]: 0,
    [SyncTaskKey.created]: new Date(),
    [SyncTaskKey.stage]: SyncStage.ready,
    [SyncTaskKey.paused]: false,
    [SyncTaskKey.nextPageToken]: null,
  };
}
