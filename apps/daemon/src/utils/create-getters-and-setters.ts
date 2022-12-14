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
  const { metadataDb, getFolderDb } = db;

  return {
    // Directory
    getDirectory: () => directorySchema.parse(metadataDb.get(DirectoryDbKeys.directory) || undefined),
    setDirectory: (directory: Directory) =>
      metadataDb.set<Directory>(DirectoryDbKeys.directory, directorySchema.parse(directory)),

    // Downloaded Ids
    getDownloadedIds: (folder: string) =>
      downloadedIdsSchema.parse(getFolderDb(folder).get(DownloadDbKeys.downloadedIds) || []),
    setDownloadedIds: (folder: string, downloadedIds: DownloadedIds) =>
      getFolderDb(folder).set<string[]>(
        DownloadDbKeys.downloadedIds,
        Array.from(downloadedIdsSchema.parse(downloadedIds))
      ),

    // File Indices
    getFileIndex: (folder: string, md5: string) =>
      fileIndexSchema.parse(getFolderDb(folder).get(`${DownloadDbKeys.files}.${md5}`) || { md5, relativePaths: [] }),
    setFileIndex: (folder: string, file: FileIndex) => {
      const folderDb = getFolderDb(folder);
      const fileIndex = fileIndexSchema.parse(file);
      const key = fileIndex.md5;

      fileIndex.relativePaths.forEach((relativePath) => {
        folderDb.set<FileIndexByFilepath>(
          `${DownloadDbKeys.filesIndexByFilename}.${relativePath.replace(/\./g, '|')}`,
          {
            fileIndexKey: key,
          }
        );
      });

      return folderDb.set<FileIndex>(`${DownloadDbKeys.files}.${key}`, fileIndex);
    },
    getFileIndexByFilepath: (folder: string, filename: string) => {
      const folderDb = getFolderDb(folder);
      const fileIndexRecord = folderDb.get(`${DownloadDbKeys.filesIndexByFilename}.${filename.replace(/\./g, '|')}`);

      if (!fileIndexRecord) return undefined;

      const { fileIndexKey } = fileIndexByFilepathSchema.parse(fileIndexRecord);
      const fileIndex = folderDb.get(`${DownloadDbKeys.files}.${fileIndexKey}`);

      return fileIndex ? fileIndexSchema.parse(fileIndex) : undefined;
    },
    resetFileIndices: (folder: string) => {
      const folderDb = getFolderDb(folder);

      folderDb.remove(DownloadDbKeys.files);
      folderDb.remove(DownloadDbKeys.filesIndexByFilename);
    },

    // Ingested Ids
    getIngestedIds: (folder: string) =>
      ingestedIdsSchema.parse(getFolderDb(folder).get(DownloadDbKeys.ingestedIds) || []),
    setIngestedIds: (folder: string, ingestedIds: IngestedIds) =>
      getFolderDb(folder).set<string[]>(DownloadDbKeys.ingestedIds, Array.from(ingestedIdsSchema.parse(ingestedIds))),

    // Media Items
    getMediaItem: (folder: string, id: string) =>
      mediaItemSchema.parse(getFolderDb(folder).get(`${DownloadDbKeys.mediaItems}.${id}`) || undefined),
    setMediaItem: (folder: string, mediaItem: MediaItem) => {
      const parsed = mediaItemSchema.parse(mediaItem);

      return getFolderDb(folder).set<MediaItem>(`${DownloadDbKeys.mediaItems}.${parsed.id}`, parsed);
    },
    removeMediaItems: (folder: string) => getFolderDb(folder).remove(DownloadDbKeys.mediaItems),

    // State
    getDownloadState: () => downloadStateSchema.parse(metadataDb.get(DownloadDbKeys.state) || undefined),
    setDownloadState: (state: Omit<DownloadState, 'updated'>) =>
      metadataDb.set<DownloadState>(DownloadDbKeys.state, downloadStateSchema.parse({ ...state, updated: new Date() })),
    updateDownloadState: (state: Partial<DownloadState>) => {
      const downloadState = downloadStateSchema.parse(metadataDb.get(DownloadDbKeys.state) || undefined);

      return metadataDb.set<DownloadState>(
        DownloadDbKeys.state,
        downloadStateSchema.parse({ ...downloadState, ...state, updated: new Date() })
      );
    },
    updatedFolderState: (folder: string, state: Partial<DownloadState>) => {},

    // Tokens
    getTokens: () => tokensSchema.parse(metadataDb.get(DownloadDbKeys.tokens) || { refreshToken: '' }),
    setTokens: (tokens: Omit<Tokens, 'updated'>) =>
      metadataDb.set<Tokens>(DownloadDbKeys.tokens, tokensSchema.parse(tokens)),

    // Urls
    getUrls: () => urlsSchema.parse(metadataDb.get(DownloadDbKeys.urls) || []),
    setUrls: (urls: Urls) => metadataDb.set<Urls>(DownloadDbKeys.urls, urlsSchema.parse(urls)),
  };
}
