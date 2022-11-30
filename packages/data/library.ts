import { animals, colors, uniqueNamesGenerator } from 'unique-names-generator';

import { firestoreDate } from './firestore';
import { mediaItemSchema } from './media-items';
import { z } from 'zod';

export const librarySchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  name: z.preprocess(
    (name) => (name ? name : uniqueNamesGenerator({ dictionaries: [colors, animals], length: 2 }).replace('_', ' ')),
    z.string()
  ),
  mediaItems: z.array(mediaItemSchema).optional(),
  imported: firestoreDate.optional(),
  created: firestoreDate.default(() => new Date()),
  updated: firestoreDate.default(() => new Date()),
});

export type Library = z.infer<typeof librarySchema>;
export type Libraries = [string, Library][];

// Library import
export enum LibraryImportStatus {
  idle = 'idle',
  running = 'running',
  paused = 'paused',
  canceled = 'canceled',
  complete = 'complete',
}

export const libraryImportSchema = z.object({
  status: z.nativeEnum(LibraryImportStatus).default(LibraryImportStatus.idle),
  count: z.number().default(0),
  bytes: z.number().default(0),
  nextPageToken: z.string().optional(),
  pageSize: z.number().default(100),
  created: firestoreDate.default(() => new Date()),
  updated: firestoreDate.default(() => new Date()),
});

export type LibraryImport = z.infer<typeof libraryImportSchema>;

// Media items
export const libraryImportMediaItemSchema = z.object({
  success: z.boolean(),
  created: z
    .date()
    .default(() => new Date())
    .optional(),
  mediaItem: mediaItemSchema,
});

export type LibraryImportMediaItem = z.infer<typeof libraryImportMediaItemSchema>;
