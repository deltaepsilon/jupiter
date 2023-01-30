import { mediaItemSchema } from 'data/media-items';
import { z } from 'zod';

const setOfStringsSchema = z.preprocess((val) => {
  if (Array.isArray(val)) {
    return new Set(val);
  }

  return val;
}, z.set(z.string()));

export enum FolderAction {
  get = 'get',
}

export const downloadedIdsSchema = setOfStringsSchema;
export type DownloadedIds = z.infer<typeof downloadedIdsSchema>;

export const downloadingIdsSchema = setOfStringsSchema;
export type DownloadingIds = z.infer<typeof downloadingIdsSchema>;

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

export const ingestedIdsSchema = setOfStringsSchema;
export type IngestedIds = z.infer<typeof ingestedIdsSchema>;

export const relativeFilePathsSchema = setOfStringsSchema;
export type RelativeFilePaths = z.infer<typeof relativeFilePathsSchema>;

export const folderDataSchema = z
  .object({
    downloadedIds: downloadedIdsSchema,
    downloadingIds: downloadingIdsSchema,
    files: z.record(z.string(), fileIndexSchema),
    filesIndexByFilename: z.record(z.string(), fileIndexByFilepathSchema),
    ingestedIds: ingestedIdsSchema,
    mediaItems: z.record(z.string(), mediaItemSchema),
    relativeFilePaths: relativeFilePathsSchema,
  })
  .default({
    downloadedIds: new Set(),
    downloadingIds: new Set(),
    files: {},
    filesIndexByFilename: {},
    ingestedIds: new Set(),
    mediaItems: {},
    relativeFilePaths: new Set(),
  });
export type FolderData = z.infer<typeof folderDataSchema>;

export const folderMessageDataSchema = z.object({
  folder: z.string(),
  folderData: folderDataSchema.optional(),
});
export type FolderMessageData = z.infer<typeof folderMessageDataSchema>;

export function getFolderDataMessage(folderData: FolderData) {
  return {
    downloadedIds: [...folderData.downloadedIds],
    downloadingIds: [...folderData.downloadingIds],
    files: folderData.files,
    filesIndexByFilename: folderData.filesIndexByFilename,
    ingestedIds: [...folderData.ingestedIds],
    mediaItems: folderData.mediaItems,
    relativeFilePaths: [...folderData.relativeFilePaths],
  };
}
