// import { QueueTasks } from '@jupiter/firebase-queue';
import { addParams } from './utils';
import { firestoreDate } from './firestore';
import { z } from 'zod';

export const fileSystemSchema = z.object({
  lastModified: z.number(),
  name: z.string(),
  size: z.number(),
  path: z.string(),
});

export const mediaItemSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  productUrl: z.string(),
  baseUrl: z.string(),
  mimeType: z.string(),
  filename: z.string(),
  mediaMetadata: z.object({
    creationTime: z.string(),
    width: z.string(),
    height: z.string(),
    video: z
      .object({
        cameraMake: z.string().optional(),
        cameraModel: z.string().optional(),
        fps: z.number().optional(),
        status: z.enum(['UNSPECIFIED', 'PROCESSING', 'FAILED', 'READY']),
      })
      .optional(),
    photo: z
      .object({
        cameraMake: z.string().optional(),
        cameraModel: z.string().optional(),
        focalLength: z.number().optional(),
        apertureFNumber: z.number().optional(),
        isoEquivalent: z.number().optional(),
        exposureTime: z.string().optional(),
      })
      .optional(),
  }),
  contributorInfo: z
    .object({ profilePictureBaseUrl: z.string().optional(), displayName: z.string().optional() })
    .optional(),
  fileSystem: fileSystemSchema.optional(),
  updated: firestoreDate.default(() => new Date()),
});

export const batchGetMediaItemsResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.string(),
  mediaItemResults: z.array(z.object({ mediaItem: mediaItemSchema })),
});
export const listMediaItemsResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  mediaItems: z.preprocess((args) => (Array.isArray(args) ? args : []), z.array(mediaItemSchema)),
  nextPageToken: z.string().optional(),
});

export type BatchGetMediaItemsResponse = z.infer<typeof batchGetMediaItemsResponseSchema>;
export type MediaItem = z.infer<typeof mediaItemSchema>;
export type MediaItems = MediaItem[];
export type MediaItemTuple = [string, MediaItem];
export type MediaItemTuples = MediaItemTuple[];

// export function extractTuplesFromQueueTasks(queueTasks: QueueTasks): MediaItemTuples {
//   return Object.values(queueTasks).map((queueTask) => {
//     const key = z.string().parse(queueTask.data.key);
//     const mediaItem = mediaItemSchema.parse(queueTask.data.mediaItem);

//     return [key, mediaItem];
//   });
// }

export function decorateImageBaseUrl(
  baseUrl: string,
  { width, height, crop, description }: { width?: number; height?: number; crop?: true; description?: true }
) {
  return addParams(baseUrl, { w: width, h: height, c: crop, d: description });
}
