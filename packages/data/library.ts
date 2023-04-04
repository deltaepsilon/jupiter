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
export const libraryImportSchema = z.object({
  status: z.nativeEnum(LibraryTaskStatus).default(LibraryTaskStatus.idle),
  count: z.number().default(0),
  isSubscribed: z.boolean().default(false),
  created: firestoreDate.default(() => new Date()),
  updated: firestoreDate.default(() => new Date()),
  startNextPageToken: z.string().optional(),
  nextPageToken: z.string().optional().nullable(),
  pageSize: z.number().default(100),
});
export type LibraryImport = z.infer<typeof libraryImportSchema>;

// Stats
export const yearSchema = z.object({
  id: z.string(),
  year: z.number(),
  count: z.number(),
  lastKey: z.string(),
});
export const monthSchema = z.object({
  id: z.string(),
  year: z.number(),
  month: z.number(),
  count: z.number(),
  lastKey: z.string(),
});
export const dateSchema = z.object({
  id: z.string(),
  year: z.number(),
  month: z.number(),
  date: z.number(),
  count: z.number(),
  lastKey: z.string(),
});
export const libraryImportStatsSchema = z
  .object({
    years: z.array(yearSchema),
    months: z.array(monthSchema),
    dates: z.array(dateSchema),
    created: firestoreDate.default(() => new Date()),
  })
  .default({ years: [], months: [], dates: [] });
export type ItemYear = z.infer<typeof yearSchema>;
export type ItemMonth = z.infer<typeof monthSchema>;
export type ItemDate = z.infer<typeof dateSchema>;
export type LibraryImportStats = z.infer<typeof libraryImportStatsSchema>;
export type LibraryImportStatsMap = {
  years: Record<string, ItemYear>;
  months: Record<string, ItemMonth>;
  dates: Record<string, ItemDate>;
};

export const MAX_UNSUBCRIBED_COUNT = 1000;