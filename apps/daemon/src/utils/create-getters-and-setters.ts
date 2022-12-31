import {
  Directory,
  DirectoryDbKeys,
  DownloadDbKeys,
  DownloadState,
  DownloadedIds,
  FileIndex,
  FileIndexByFilepath,
  IngestedIds,
  Tokens,
  Urls,
  directorySchema,
  downloadStateSchema,
  downloadedIdsSchema,
  fileIndexByFilepathSchema,
  fileIndexSchema,
  ingestedIdsSchema,
  tokensSchema,
  urlsSchema,
} from 'data/daemon';
import { MediaItem, mediaItemSchema } from 'data/media-items';

import { FilesystemDatabase } from 'daemon/src/db';

export type GettersAndSetters = ReturnType<typeof createGettersAndSetters>;

export function createGettersAndSetters(db: FilesystemDatabase) {
  const { metadataDb, downloadedItemsDb, ingestedItemsDb, mediaItemsDb, fileIndexDb } = db;

  return {
    // Directory
    getDirectory: () => directorySchema.parse(metadataDb.get(DirectoryDbKeys.directory) || undefined),
    setDirectory: (directory: Directory) =>
      metadataDb.set<Directory>(DirectoryDbKeys.directory, directorySchema.parse(directory)),

    // Downloaded Ids
    getDownloadedIds: () => downloadedIdsSchema.parse(downloadedItemsDb.get(DownloadDbKeys.downloadedIds) || []),
    setDownloadedIds: (downloadedIds: DownloadedIds) =>
      downloadedItemsDb.set<string[]>(
        DownloadDbKeys.downloadedIds,
        Array.from(downloadedIdsSchema.parse(downloadedIds))
      ),

    // File Indices
    getFileIndex: (md5: string) =>
      fileIndexSchema.parse(fileIndexDb.get(`${DownloadDbKeys.files}.${md5}`) || { md5, relativePaths: [] }),
    setFileIndex: (file: FileIndex) => {
      const fileIndex = fileIndexSchema.parse(file);
      const key = fileIndex.md5;

      fileIndex.relativePaths.forEach((relativePath) => {
        fileIndexDb.set<FileIndexByFilepath>(`${DownloadDbKeys.filesIndexByFilename}.${relativePath}`, {
          fileIndexKey: key,
        });
      });

      return fileIndexDb.set<FileIndex>(`${DownloadDbKeys.files}.${key}`, fileIndex);
    },
    getFileIndexByFilepath: (filename: string) => {
      const fileIndexRecord = metadataDb.get(`${DownloadDbKeys.filesIndexByFilename}.${filename}`);

      if (!fileIndexRecord) return undefined;

      const { fileIndexKey } = fileIndexByFilepathSchema.parse(fileIndexRecord);
      console.log({ fileIndexKey });
      const fileIndex = metadataDb.get(`${DownloadDbKeys.files}.${fileIndexKey}`);

      console.log({ fileIndex });

      return fileIndex ? fileIndexSchema.parse(fileIndex) : undefined;
    },

    // Ingested Ids
    getIngestedIds: () => ingestedIdsSchema.parse(ingestedItemsDb.get(DownloadDbKeys.ingestedIds) || []),
    setIngestedIds: (ingestedIds: IngestedIds) =>
      ingestedItemsDb.set<string[]>(DownloadDbKeys.ingestedIds, Array.from(ingestedIdsSchema.parse(ingestedIds))),

    // Media Items
    getMediaItem: (id: string) =>
      mediaItemSchema.parse(mediaItemsDb.get(`${DownloadDbKeys.mediaItems}.${id}`) || undefined),
    setMediaItem: (mediaItem: MediaItem) => {
      const parsed = mediaItemSchema.parse(mediaItem);

      mediaItemsDb.set<MediaItem>(`${DownloadDbKeys.mediaItems}.${parsed.id}`, parsed);
    },
    removeMediaItems: () => metadataDb.remove(DownloadDbKeys.mediaItems),

    // State
    getState: () => downloadStateSchema.parse(metadataDb.get(DownloadDbKeys.state) || undefined),
    setState: (state: Omit<DownloadState, 'updated'>) =>
      metadataDb.set<DownloadState>(DownloadDbKeys.state, downloadStateSchema.parse(state)),

    // Tokens
    getTokens: () => tokensSchema.parse(metadataDb.get(DownloadDbKeys.tokens) || undefined),
    setTokens: (tokens: Omit<Tokens, 'updated'>) =>
      metadataDb.set<Tokens>(DownloadDbKeys.tokens, tokensSchema.parse(tokens)),

    // Urls
    getUrls: () => urlsSchema.parse(metadataDb.get(DownloadDbKeys.urls) || []),
    setUrls: (urls: Urls) => metadataDb.set<Urls>(DownloadDbKeys.urls, urlsSchema.parse(urls)),
  };
}
