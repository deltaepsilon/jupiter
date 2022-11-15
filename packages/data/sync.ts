import { z } from 'zod';

export enum Cookie {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
}

enum SyncJobKey {
  jobName = 'jobName',
  directoryHandle = 'directoryHandle',
  directoryName = 'directoryName',
  created = 'created',
  fileCount = 'fileCount',
  importedCount = 'importedCount',
  processedCount = 'processedCount',
  exportedCount = 'exportedCount',
  stage = 'stage',
  nextPageToken = 'nextPageToken',
}

export enum SyncStage {
  ready = 'ready',
  reading = 'reading',
  writing = 'writing',
}

export const syncJobSchema = z.object({
  [Cookie.accessToken]: z.string(),
  [Cookie.refreshToken]: z.string(),
  [SyncJobKey.jobName]: z.string(),
  [SyncJobKey.directoryHandle]: z
    .any()
    .refine((obj) => obj instanceof FileSystemDirectoryHandle, { message: 'Must be a FileSystemDirectoryHandle' }),
  [SyncJobKey.fileCount]: z.number(),
  [SyncJobKey.importedCount]: z.number(),
  [SyncJobKey.processedCount]: z.number(),
  [SyncJobKey.exportedCount]: z.number(),
  [SyncJobKey.created]: z.date(),
  [SyncJobKey.stage]: z.nativeEnum(SyncStage),
  [SyncJobKey.nextPageToken]: z.string().nullable().optional(),
});

export const syncJobRecordSchema = z.object({
  [Cookie.accessToken]: z.string(),
  [Cookie.refreshToken]: z.string(),
  [SyncJobKey.jobName]: z.string(),
  [SyncJobKey.fileCount]: z.number(),
  [SyncJobKey.importedCount]: z.number(),
  [SyncJobKey.processedCount]: z.number(),
  [SyncJobKey.exportedCount]: z.number(),
  [SyncJobKey.directoryName]: z.string(),
  [SyncJobKey.created]: z.string(),
  [SyncJobKey.stage]: z.nativeEnum(SyncStage),
  [SyncJobKey.nextPageToken]: z.string().nullable().optional(),
});

export type SyncJob = z.infer<typeof syncJobSchema>;
export type SyncJobRecord = z.infer<typeof syncJobRecordSchema>;
export type SyncJobs = Record<string, SyncJob>;
export type SyncJobRecords = Record<string, SyncJobRecord>;

export function serializeSyncJob(job: SyncJob): SyncJobRecord {
  return syncJobRecordSchema.parse({
    ...job,
    [SyncJobKey.created]: job.created.toISOString(),
    [SyncJobKey.directoryName]: job.directoryHandle.name,
  });
}

export function getSyncJobsRefPath(userId: string) {
  return `sync-jobs/${userId}`;
}

export function getSyncJobRefPath(userId: string, jobId: string) {
  return `${getSyncJobsRefPath(userId)}/${jobId}`;
}

export const DEFAULT_SYNC_JOB: SyncJob = {
  [Cookie.accessToken]: '',
  [Cookie.refreshToken]: '',
  [SyncJobKey.jobName]: '',
  [SyncJobKey.fileCount]: 0,
  [SyncJobKey.importedCount]: 0,
  [SyncJobKey.processedCount]: 0,
  [SyncJobKey.exportedCount]: 0,
  [SyncJobKey.created]: new Date(),
  [SyncJobKey.stage]: SyncStage.ready,
  [SyncJobKey.nextPageToken]: null,
};
