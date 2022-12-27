// import { TaskKey, taskSchema } from '@jupiter/firebase-queue';

import { mediaItemSchema } from './media-items';
import { z } from 'zod';

export enum DownloadKey {
  mediaItem = 'mediaItem',
}

export const downloadSchema = z.object({ [DownloadKey.mediaItem]: mediaItemSchema });

export type Download = z.infer<typeof downloadSchema>;

// export const downloadTaskSchema = taskSchema.extend({
//   [TaskKey.data]: z.object({
//     [DownloadKey.mediaItem]: mediaItemSchema.optional(),
//   }),
// });

export function getDownloadQueueRefPath({ userId, syncTaskId }: { userId: string; syncTaskId: string }): string {
  return `download-queue/${userId}/${syncTaskId}`;
}
