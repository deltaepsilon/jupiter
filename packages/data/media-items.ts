import { addParams } from 'ui/utils';
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
});

export const mediaItemsResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  mediaItems: z.preprocess(
    (args) => (Array.isArray(args) ? args : []),
    z.array(mediaItemSchema),
    z.array(mediaItemSchema)
  ),
  nextPageToken: z.string().optional(),
});

export type MediaItem = z.infer<typeof mediaItemSchema>;
export type MediaItems = MediaItem[];

export function decorateImageBaseUrl(
  baseUrl: string,
  { width, height, crop, description }: { width?: number; height?: number; crop?: true; description?: true }
) {
  return addParams(baseUrl, { w: width, h: height, c: crop, d: description });
}
