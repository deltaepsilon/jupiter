import { z } from 'zod';

export enum MessageType {
  syncJob = 'syncJob',
}

export enum SyncJobAction {
  start = 'start',
}

export const syncJobStartMessageSchema = z.object({
  jobId: z.string(),
  action: z.nativeEnum(SyncJobAction),
  type: z.enum([MessageType.syncJob]),
});

type SyncJobStartMessage = z.infer<typeof syncJobStartMessageSchema>;

export type ServiceWorkerMessage = SyncJobStartMessage;
