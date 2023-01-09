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

export const folderSchema = z.object({
  folder: z.string(),
  description: z.string(),
  indexedCount: z.number().default(0),
  isPaused: z.boolean().default(false),
  downloadedCount: z.number().default(0),
  mediaItemsCount: z.number().default(0),
  state: z.enum(['idle', 'indexing', 'downloading', 'complete']).default('idle'),
  updated: stringDate.default(() => new Date()),
});
export type Folder = z.infer<typeof folderSchema>;

export const downloadStateSchema = z
  .object({
    downloadedCount: z.number().default(0),
    filesystemProgress: z.number().default(0),
    folders: z.array(folderSchema).default([]),
    isPaused: z.boolean().default(false),
    lastKey: z.string().optional(),
    state: z.enum(['idle', 'ingesting', 'indexing', 'downloading', 'complete']).default('idle'),
    text: z.string(),
    updated: stringDate.default(() => new Date()),
  })
  .default({
    downloadedCount: 0,
    folders: [],
    state: 'idle',
    text: '',
    updated: new Date(),
  });

export const MISSING_DATE_FOLDER = 'missing-date';
export const DOWNLOADING_FOLDER = '__downloading';
export const DEFAULT_DOWNLOAD_STATE = downloadStateSchema.parse(undefined);
export type DownloadState = z.infer<typeof downloadStateSchema>;

const RUNNING_STATES: Set<DownloadState['state']> = new Set(['ingesting', 'indexing', 'downloading']);
export function getIsRunning(state: DownloadState) {
  return !state.isPaused && RUNNING_STATES.has(state.state);
}

export function getShouldIngest(downloadState: DownloadState) {
  return getIsRunning(downloadState);
}

export function getStateFlags(downloadState: DownloadState = DEFAULT_DOWNLOAD_STATE) {
  return {
    isComplete: downloadState.state === 'complete',
    allFoldersComplete: downloadState.folders.every((folder) => folder.downloadedCount === folder.mediaItemsCount),
    isRunning: getIsRunning(downloadState),
    shouldIngest: getShouldIngest(downloadState),
  };
}

export function getTotals(downloadState: DownloadState = DEFAULT_DOWNLOAD_STATE) {
  return downloadState.folders.reduce(
    (acc, folder) => {
      acc.mediaItemsCount += folder.mediaItemsCount;
      acc.downloadedCount += folder.downloadedCount;
      acc.indexedCount += folder.indexedCount;
      return acc;
    },
    { mediaItemsCount: 0, downloadedCount: 0, indexedCount: 0 }
  );
}

export function updateFolder(
  { folder, downloadState }: { folder: string; downloadState: DownloadState },
  updateFunction: (folder: Folder) => Folder
) {
  const state = downloadStateSchema.parse(downloadState);
  const folderIndex = state.folders.findIndex((f) => f.folder === folder);

  if (folderIndex === -1) {
    state.folders.push(updateFunction(folderSchema.parse({ folder, description: folder })));
  } else {
    state.folders[folderIndex] = updateFunction(state.folders[folderIndex]);
  }

  return state;
}

export const downloadDataSchema = z.object({
  libraryId: z.string(),
  folder: z.string().optional(),
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
