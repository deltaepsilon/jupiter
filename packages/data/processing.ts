import { mediaItemSchema } from './media-items';
import { z } from 'zod';

export enum ProcessingKey {
  mediaItem = 'mediaItem',
  created = 'created',
  isActive = 'isActive',
  started = 'started',
  completed = 'completed',
}

export enum ProcessingState {
  waiting = 'waiting',
  active = 'active',
}

export enum ProcessingStage {
  active = 'active',
  error = 'error',
  complete = 'complete',
}

export const processingJobRecordSchema = z.object({
  [ProcessingKey.mediaItem]: mediaItemSchema.optional(),
  [ProcessingKey.isActive]: z.boolean(),
  [ProcessingKey.created]: z.date(),
  [ProcessingKey.started]: z.date().optional(),
  [ProcessingKey.completed]: z.date().optional(),
});

export type ProcessingJobRecord = z.infer<typeof processingJobRecordSchema>;
export type ProcessingJobRecordTuple = [string | null, ProcessingJobRecord | null];
export type ProcessingJobRecords = Record<string, ProcessingJobRecord>;

export function getProcessingJobsRefPath({ userId, syncJobId }: { userId: string; syncJobId: string }): string {
  return `processing/${userId}/${syncJobId}`;
}

export function getProcessingStageRefPath({
  userId,
  syncJobId,
  stage,
}: {
  userId: string;
  syncJobId: string;
  stage: ProcessingStage;
}) {
  return `${getProcessingJobsRefPath({ userId, syncJobId })}/${stage}`;
}

export function getProcessingJobRefPath({
  userId,
  syncJobId,
  jobId,
  stage,
}: {
  userId: string;
  syncJobId: string;
  jobId: string;
  stage: ProcessingStage;
}) {
  return `${getProcessingStageRefPath({ userId, stage, syncJobId })}/${jobId}`;
}

export function getDefaultProcessingJob(): ProcessingJobRecord {
  return {
    [ProcessingKey.isActive]: false,
    [ProcessingKey.created]: new Date(),
  };
}
