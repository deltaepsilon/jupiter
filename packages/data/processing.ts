import { mediaItemSchema } from './media-items';
import { z } from 'zod';

enum ProcessingKey {
  mediaItem = 'mediaItem',
  stage = 'stage',
  created = 'created',
}

export enum ProcessingStage {
  ready = 'ready',
  reading = 'reading',
  writing = 'writing',
}

export const processingJobRecordSchema = z.object({
  [ProcessingKey.mediaItem]: mediaItemSchema.optional(),
  [ProcessingKey.created]: z.date(),
  [ProcessingKey.stage]: z.nativeEnum(ProcessingStage),
});

export type ProcessingJobRecord = z.infer<typeof processingJobRecordSchema>;
export type ProcessingJobRecords = Record<string, ProcessingJobRecord>;

export function getProcessingJobsRefPath(userId: string, syncJobId: string): string {
  return `processing/${userId}/${syncJobId}`;
}

export function getSyncJobRefPath(userId: string, syncJobId: string, jobId: string) {
  return `${getProcessingJobsRefPath(userId, syncJobId)}/${jobId}`;
}

export const DEFAULT_PROCESSING_JOB: ProcessingJobRecord = {
  [ProcessingKey.created]: new Date(),
  [ProcessingKey.stage]: ProcessingStage.ready,
};
