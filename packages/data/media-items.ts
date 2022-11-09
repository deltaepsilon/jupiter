import { z } from 'zod';

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
        focalLength: z.string().optional(),
        apertureFNumber: z.number().optional(),
        isoEquivalent: z.number().optional(),
        exposureTime: z.string().optional(),
      })
      .optional(),
  }),
  contributorInfo: z
    .object({ profilePictureBaseUrl: z.string().optional(), displayName: z.string().optional() })
    .optional(),
});

export const mediaItemsResponseSchema = z.object({
  mediaItems: z.array(mediaItemSchema),
  nextPageToken: z.string().optional(),
});

export type MediaItem = z.infer<typeof mediaItemSchema>;
export type MediaItems = MediaItem[];
