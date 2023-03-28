import { FIREBASE } from '../firebase';
import { mediaItemSchema } from '../media-items';
import short from 'short-uuid';
import { z } from 'zod';

export enum DownloadDbKeys {
  corruptedIds = 'corruptedIds',
  downloadingIds = 'downloadingIds',
  downloadedIds = 'downloadedIds',
  files = 'files',
  filesIndexByFilename = 'filesIndexByFilename',
  ingestedIds = 'ingestedIds',
  mediaItems = 'mediaItems',
  relativeFilePaths = 'relativeFilePaths',
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

export enum DownloadAction {
  init = 'init',
  start = 'start',
  pause = 'pause',
  cancel = 'cancel',
  destroy = 'destroy',

  addMediaItem = 'add-media-item',
  invalidateMediaItems = 'invalidate-media-items',
  indexFilesystem = 'index-filesystem',
  restartIngest = 'restart-ingest',
}

export const urlsSchema = z
  .object({ refreshAccessToken: z.string(), batchGetMediaItems: z.string() })
  .default({
    refreshAccessToken: FIREBASE.FUNCTIONS.REFRESH_ACCESS_TOKEN,
    batchGetMediaItems: FIREBASE.FUNCTIONS.BATCH_GET_MEDIA_ITEMS,
  });
export type Urls = z.infer<typeof urlsSchema>;

export const tokensSchema = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string(),
  expiresAt: stringDate.optional(),
  updated: stringDate.default(() => new Date()),
});
export type Tokens = z.infer<typeof tokensSchema>;

const folderSummarySchema = z.object({
  id: z.string().default(() => short.uuid()),
  folder: z.string(),
  description: z.string(),
  indexedCount: z.number().default(0),
  isPaused: z.boolean().default(false),
  corruptedCount: z.number().default(0),
  downloadedCount: z.number().default(0),
  mediaItemsCount: z.number().default(0),
  state: z.enum(['idle', 'indexing', 'downloading', 'complete']).default('idle'),
  updated: stringDate.default(() => new Date()),
});
export type FolderSummary = z.infer<typeof folderSummarySchema>;

export const downloadStateSchema = z
  .object({
    downloadedCount: z.number().default(0),
    filesystemProgress: z.number().default(0),
    folderSummaries: z.array(folderSummarySchema).default([]),
    isPaused: z.boolean().default(false),
    lastKey: z.string().optional(),
    state: z.enum(['idle', 'ingesting', 'indexing', 'downloading', 'complete']).default('idle'),
    text: z.string(),
    updated: stringDate.default(() => new Date()),
  })
  .default({
    downloadedCount: 0,
    folderSummaries: [],
    state: 'idle',
    text: '',
    updated: new Date(),
  });

export const yearStatsSchema = z
  .object({
    indexedCount: z.number(),
    downloadedCount: z.number(),
    mediaItemsCount: z.number(),
    progress: z.number(),
    bytes: z.number(),
    total: z.number(),
  })
  .default({
    indexedCount: 0,
    downloadedCount: 0,
    mediaItemsCount: 0,
    progress: 0,
    bytes: 0,
    total: 0,
  });
export type YearStats = z.infer<typeof yearStatsSchema>;

export const MISSING_DATE_FOLDER = 'missing-date';
export const CORRUPTED_FOLDER = 'corrupted';
export const DOWNLOADING_FOLDER = '__downloading';
export const DEFAULT_DOWNLOAD_STATE = downloadStateSchema.parse(undefined);
export type DownloadState = z.infer<typeof downloadStateSchema>;

const RUNNING_STATES: Set<DownloadState['state']> = new Set(['ingesting', 'indexing', 'downloading']);
export function getIsRunning(state: DownloadState) {
  return !state.isPaused && RUNNING_STATES.has(state.state);
}

function getIsComplete(state: DownloadState) {
  return state.state === 'complete';
}

export function getShouldIngest(downloadState: DownloadState) {
  return getIsRunning(downloadState) || getIsComplete(downloadState);
}

export function getStateFlags(downloadState: DownloadState = DEFAULT_DOWNLOAD_STATE) {
  return {
    isComplete: getIsComplete(downloadState),
    allFoldersComplete:
      !!downloadState.folderSummaries.length &&
      downloadState.folderSummaries.every(
        (folderSummary) => folderSummary.downloadedCount >= folderSummary.mediaItemsCount
      ),
    isRunning: getIsRunning(downloadState),
    shouldIngest: getShouldIngest(downloadState),
  };
}

export function getTotals(downloadState: DownloadState = DEFAULT_DOWNLOAD_STATE) {
  return downloadState.folderSummaries.reduce(
    (acc, folderSummary) => {
      acc.mediaItemsCount += folderSummary.mediaItemsCount;
      acc.downloadedCount += folderSummary.downloadedCount;
      acc.indexedCount += folderSummary.indexedCount;
      return acc;
    },
    { mediaItemsCount: 0, downloadedCount: 0, indexedCount: 0 }
  );
}

export async function updateFolder(
  { folder, downloadState }: { folder: string; downloadState: DownloadState },
  updateFunction: (folderSummary: FolderSummary) => Promise<FolderSummary>
) {
  const state = downloadStateSchema.parse(downloadState);
  const folderIndex = state.folderSummaries.findIndex((f) => f.folder === folder);

  if (folderIndex === -1) {
    state.folderSummaries.push(await updateFunction(folderSummarySchema.parse({ folder, description: folder })));
  } else {
    state.folderSummaries[folderIndex] = await updateFunction(state.folderSummaries[folderIndex]);
  }

  return state;
}

export const downloadMessageDataSchema = z.object({
  libraryId: z.string(),
  folder: z.string().optional(),
  tokens: tokensSchema.optional(),
  state: downloadStateSchema,
  mediaItem: mediaItemSchema.extend({ key: z.string() }).optional(),
  urls: urlsSchema.optional(),
});
export type DownloadMessageData = z.infer<typeof downloadMessageDataSchema>;

export const progressMessageDataSchema = z.object({
  id: z.string(),
  folder: z.string(),
  filename: z.string(),
  progressEvent: z.object({
    loaded: z.number(),
    total: z.number().optional(),
    progress: z.number().optional(),
    bytes: z.number(),
    rate: z.number().optional(),
    estimated: z.number().optional(),
    download: z.boolean().optional(),
  }),
  created: z.number().default(() => Date.now()),
});
export type ProgressMessageData = z.infer<typeof progressMessageDataSchema>;

export const invalidateMediaItemsMessageDataSchema = z.object({
  invalidMediaIds: z.array(z.string()),
  invalidMediaKeys: z.array(z.string()),
});
export type InvalidateMediaItemsMessageData = z.infer<typeof invalidateMediaItemsMessageDataSchema>;
