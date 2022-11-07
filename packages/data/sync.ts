import { z } from 'zod';

const syncJobSchema = z.object({ created: z.date() });

export type SyncJob = z.infer<typeof syncJobSchema>;
export type SyncJobs = SyncJob[];
