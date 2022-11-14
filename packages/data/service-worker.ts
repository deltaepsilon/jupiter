import { z } from 'zod';

export enum MessageType {
  syncJob = 'syncJob',
}

export enum SyncJobAction {
  start = 'start',
}

export const syncJobStartMessageSchema = z.object({
  accessToken: z.string(),
  jobId: z.string(),
  directoryHandle: z
    .any()
    .refine((obj) => obj instanceof FileSystemDirectoryHandle, { message: 'Must be a FileSystemDirectoryHandle' }),
  action: z.nativeEnum(SyncJobAction),
  type: z.enum([MessageType.syncJob]),
});

type SyncJobStartMessage = z.infer<typeof syncJobStartMessageSchema>;

export type ServiceWorkerMessage = SyncJobStartMessage;
