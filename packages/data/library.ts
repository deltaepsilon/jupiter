import { TaskKey, taskSchema } from '@jupiter/firebase-queue';
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
  created: firestoreDate.default(() => new Date()),
  updated: firestoreDate.default(() => new Date()),
});

export type Library = z.infer<typeof librarySchema>;
export type Libraries = [string, Library][];

// All tasks
export enum LibraryTaskStatus {
  idle = 'idle',
  running = 'running',
  paused = 'paused',
  canceled = 'canceled',
  destroyed = 'destroyed',
  complete = 'complete',
}

const libraryTaskSchema = z.object({
  status: z.nativeEnum(LibraryTaskStatus).default(LibraryTaskStatus.idle),
  count: z.number().default(0),
  created: firestoreDate.default(() => new Date()),
  updated: firestoreDate.default(() => new Date()),
});

export const libraryTaskStatusRequest = z.object({
  libraryId: z.string(),
  status: z.nativeEnum(LibraryTaskStatus),
});
export const libraryTaskStatusResponse = z.object({
  success: z.boolean(),
});
export type LibraryTaskStatusRequest = z.infer<typeof libraryTaskStatusRequest>;
export type LibraryTaskStatusResponse = z.infer<typeof libraryTaskStatusResponse>;

// Library import
export const libraryImportSchema = libraryTaskSchema.extend({
  nextPageToken: z.string().optional().nullable(),
  pageSize: z.number().default(100),
});
export type LibraryImport = z.infer<typeof libraryImportSchema>;

// Library download
export const libraryDownloadSchema = libraryTaskSchema.extend({
  bytes: z.number().default(0),
  lastKey: z.string().optional().nullable(),
});
export const libraryDownloadTaskSchema = taskSchema.extend({
  [TaskKey.data]: z.object({ key: z.string(), mediaItem: mediaItemSchema }),
});
export type LibraryDownload = z.infer<typeof libraryDownloadSchema>;
export type LibraryDownloadTask = z.infer<typeof libraryDownloadTaskSchema>;

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
