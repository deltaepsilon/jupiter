import { z } from 'zod';

export enum Cookie {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
}

export enum Stage {
  ready = 'ready',
  reading = 'reading',
  writing = 'writing',
}

export const syncJobSchema = z.object({
  [Cookie.accessToken]: z.string(),
  [Cookie.refreshToken]: z.string(),
  directoryHandle: z
    .any()
    .refine((obj) => obj instanceof FileSystemDirectoryHandle, { message: 'Must be a FileSystemDirectoryHandle' }),
  created: z.date(),
  stage: z.nativeEnum(Stage),
});

export const syncJobRecordSchema = z.object({
  [Cookie.accessToken]: z.string(),
  [Cookie.refreshToken]: z.string(),
  directoryName: z.string(),
  created: z.string(),
  stage: z.nativeEnum(Stage),
});

export type SyncJob = z.infer<typeof syncJobSchema>;
export type SyncJobRecord = z.infer<typeof syncJobRecordSchema>;
export type SyncJobs = Record<string, SyncJob>;
export type SyncJobRecords = Record<string, SyncJobRecord>;

export function serializeSyncJob(job: SyncJob): SyncJobRecord {
  return syncJobRecordSchema.parse({
    ...job,
    created: job.created.toISOString(),
    directoryName: job.directoryHandle.name,
  });
}

export function getSyncJobsRefPath(userId: string) {
  return `sync-jobs/${userId}`;
}

export function getSyncJobRefPath(userId: string, jobId: string) {
  return `${getSyncJobsRefPath(userId)}/${jobId}`;
}
