import { mediaItemSchema } from '../media-items';
import { z } from 'zod';

export enum DownloadDbKeys {
  downloadedIds = 'downloadedIds',
  files = 'files',
  filesIndexByFilename = 'filesIndexByFilename',
  ingestedIds = 'ingestedIds',
  mediaItems = 'mediaItems',
  state = 'state',
  tokens = 'tokens',
  urls = 'urls',
}

const stringDate = z.preprocess((arg) => {
  if (arg instanceof Date) {
    return arg;
  } else if (typeof arg === 'string') {
    return new Date(arg);
  }

  return undefined;
}, z.date().optional());

export const ingestedIdsSchema = z.preprocess((val) => {
  if (Array.isArray(val)) {
    return new Set(val);
  }

  return val;
}, z.set(z.string()));
export type IngestedIds = z.infer<typeof ingestedIdsSchema>;

export const downloadedIdsSchema = z.preprocess((val) => {
  if (Array.isArray(val)) {
    return new Set(val);
  }

  return val;
}, z.set(z.string()));
export type DownloadedIds = z.infer<typeof downloadedIdsSchema>;

export enum DownloadAction {
  init = 'init',
  start = 'start',
  pause = 'pause',
  cancel = 'cancel',
  destroy = 'destroy',

  addMediaItem = 'add-media-item',
  indexFilesystem = 'index-filesystem',
}

export const urlsSchema = z.object({ refreshAccessToken: z.string(), batchGetMediaItems: z.string() });
export type Urls = z.infer<typeof urlsSchema>;

export const tokensSchema = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string(),
  expiresAt: stringDate.optional(),
  updated: stringDate.default(() => new Date()),
});
export type Tokens = z.infer<typeof tokensSchema>;

export const downloadStateSchema = z
  .object({
    isRunning: z.boolean().default(false),
    isDownloadComplete: z.boolean().default(false),
    isIngestComplete: z.boolean().default(false),
    isIndexComplete: z.boolean().default(false),
    lastKey: z.string().optional(),
    ingestedCount: z.number().default(0),
    downloadedCount: z.number().default(0),
    progress: z.number(),
    filesystemProgress: z.number(),
    text: z.string(),
    updated: stringDate.default(() => new Date()),
  })
  .default({
    isRunning: false,
    isDownloadComplete: false,
    isIngestComplete: false,
    isIndexComplete: false,
    progress: 0,
    filesystemProgress: 0,
    ingestedCount: 0,
    downloadedCount: 0,
    text: '',
    updated: new Date(),
  });

export const DEFAULT_DOWNLOAD_STATE = downloadStateSchema.parse(undefined);

export type DownloadState = z.infer<typeof downloadStateSchema>;

export const downloadDataSchema = z.object({
  libraryId: z.string(),
  tokens: tokensSchema.optional(),
  state: downloadStateSchema,
  mediaItem: mediaItemSchema.extend({ key: z.string() }).optional(),
  urls: urlsSchema.optional(),
});
export type DownloadData = z.infer<typeof downloadDataSchema>;

export const fileIndexSchema = z.object({
  md5: z.string(),
  relativePaths: z.array(z.string()),
  mediaItemId: z.string().optional(),
});
export type FileIndex = z.infer<typeof fileIndexSchema>;

export const fileIndexByFilepathSchema = z.object({
  fileIndexKey: z.string(),
});
export type FileIndexByFilepath = z.infer<typeof fileIndexByFilepathSchema>;
