import {
  CorruptedIds,
  Directory,
  DirectoryDbKeys,
  DownloadDbKeys,
  DownloadState,
  DownloadedIds,
  DownloadingIds,
  FileIndex,
  FileIndexByFilepath,
  IngestedIds,
  RelativeFilePaths,
  Tokens,
  Urls,
  corruptedIdsSchema,
  directorySchema,
  downloadStateSchema,
  downloadedIdsSchema,
  downloadingIdsSchema,
  fileIndexByFilepathSchema,
  fileIndexSchema,
  folderDataSchema,
  ingestedIdsSchema,
  relativeFilePathsSchema,
  tokensSchema,
  urlsSchema,
} from 'data/daemon';
import { MediaItem, mediaItemSchema } from 'data/media-items';

import { LevelDatabase } from 'daemon/src/level';

export type GettersAndSetters = ReturnType<typeof createGettersAndSetters>;

export function createGettersAndSetters(db: LevelDatabase) {
  const { metadataDb, getFolderDb } = db;

  const getters = {
    // META
    getFolderData: async (folder: string) => {
      const folderMediaItemsDb = getFolderDb(folder, DownloadDbKeys.mediaItems);
      const mediaItems = await folderMediaItemsDb.values().all();
      const [ingestedIds, downloadingIds, relativeFilePaths, filesIndexByFilename, files, downloadedIds] =
        await getFolderDb(folder).getMany([
          'ingestedIds',
          'downloadingIds',
          'relativeFilePaths',
          'filesIndexByFilename',
          'files',
          'downloadedIds',
        ]);

      return folderDataSchema.parse({
        ingestedIds,
        mediaItems,
        downloadingIds,
        relativeFilePaths,
        filesIndexByFilename,
        files,
        downloadedIds,
      });
    },

    // Directory
    getDirectory: async () => metadataDb.get<Directory>(DirectoryDbKeys.directory, directorySchema),
    setDirectory: async (directory: Directory) =>
      metadataDb.put(DirectoryDbKeys.directory, directorySchema.parse(directory)),

    // Corrupted Ids
    getCorruptedIds: async (folder: string) =>
      getFolderDb(folder).get<CorruptedIds>(DownloadDbKeys.corruptedIds, corruptedIdsSchema),
    setCorruptedIds: async (folder: string, corruptedIds: CorruptedIds) =>
      getFolderDb(folder).put(DownloadDbKeys.corruptedIds, Array.from(corruptedIdsSchema.parse(corruptedIds))),
    updateCorruptedIds: async (folder: string, callback: (corruptedIds: CorruptedIds) => CorruptedIds) => {
      const corruptedIds = await getters.getCorruptedIds(folder);
      const newCorruptedIds = callback(corruptedIds);

      return getters.setCorruptedIds(folder, newCorruptedIds);
    },

    // Downloaded Ids
    getDownloadedIds: async (folder: string) =>
      getFolderDb(folder).get<DownloadedIds>(DownloadDbKeys.downloadedIds, downloadedIdsSchema),
    setDownloadedIds: async (folder: string, downloadedIds: DownloadedIds) =>
      getFolderDb(folder).put(DownloadDbKeys.downloadedIds, Array.from(downloadedIdsSchema.parse(downloadedIds))),
    updateDownloadedIds: async (folder: string, callback: (downloadedIds: DownloadedIds) => DownloadedIds) => {
      const downloadedIds = await getters.getDownloadedIds(folder);
      const newDownloadedIds = callback(downloadedIds);

      return getters.setDownloadedIds(folder, newDownloadedIds);
    },

    // Downloading Ids
    getDownloadingIds: async (folder: string) =>
      getFolderDb(folder).get<DownloadingIds>(DownloadDbKeys.downloadingIds, downloadingIdsSchema),
    setDownloadingIds: async (folder: string, downloadingIds: DownloadingIds) =>
      getFolderDb(folder).put(DownloadDbKeys.downloadingIds, Array.from(downloadingIdsSchema.parse(downloadingIds))),
    clearDownloadingIds: async () => {
      const downloadState = await getters.getDownloadState();

      return Promise.all(
        downloadState.folderSummaries.map(async (f) => getters.setDownloadingIds(f.folder, new Set()))
      );
    },
    updateDownloadingIds: async (folder: string, callback: (downloadingIds: DownloadingIds) => DownloadingIds) => {
      const downloadingIds = await getters.getDownloadingIds(folder);
      const newDownloadingIds = callback(downloadingIds);

      return getters.setDownloadingIds(folder, newDownloadingIds);
    },

    // File Indices
    getFileIndex: async (folder: string, md5: string) =>
      getFolderDb(folder).get<FileIndex>(`${DownloadDbKeys.files}.${md5}`, fileIndexSchema, { md5, relativePaths: [] }),
    setFileIndex: async (folder: string, file: FileIndex) => {
      const folderDb = getFolderDb(folder);
      const fileIndex = fileIndexSchema.parse(file);
      const key = fileIndex.md5;

      await Promise.all(
        fileIndex.relativePaths.map(async (relativePath) => {
          await getters.addRelativeFilePath(folder, relativePath);

          await folderDb.put(`${DownloadDbKeys.filesIndexByFilename}.${relativePath.replace(/\./g, '|')}`, {
            fileIndexKey: key,
          });
        })
      );

      return folderDb.put(`${DownloadDbKeys.files}.${key}`, fileIndex);
    },
    getFileIndexByFilepath: async (folder: string, filename: string) => {
      const folderDb = getFolderDb(folder);
      const { fileIndexKey } = await folderDb.get<FileIndexByFilepath>(
        `${DownloadDbKeys.filesIndexByFilename}.${filename.replace(/\./g, '|')}`,
        fileIndexByFilepathSchema
      );

      if (!fileIndexKey) return undefined;

      return folderDb.get<FileIndex>(`${DownloadDbKeys.files}.${fileIndexKey}`, fileIndexSchema, {
        md5: fileIndexKey,
        relativePaths: [],
      });
    },
    resetFileIndices: async (folder: string) => {
      const folderDb = getFolderDb(folder);

      await folderDb.del(DownloadDbKeys.files);
      await folderDb.del(DownloadDbKeys.filesIndexByFilename);
    },

    // Ingested Ids
    getIngestedIds: async (folder: string) =>
      getFolderDb(folder).get<IngestedIds>(DownloadDbKeys.ingestedIds, ingestedIdsSchema),
    setIngestedIds: async (folder: string, ingestedIds: IngestedIds) =>
      getFolderDb(folder).put(DownloadDbKeys.ingestedIds, Array.from(ingestedIdsSchema.parse(ingestedIds))),
    removeIngestedIds: async (folder: string, ingestedIds: string[]) => {
      const ids = await getters.getIngestedIds(folder);

      ingestedIds.forEach((id) => ids.delete(id));

      return getters.setIngestedIds(folder, ids);
    },

    // Media Items
    getMediaItem: async (folder: string, id: string) =>
      getFolderDb(folder, DownloadDbKeys.mediaItems).get<MediaItem>(id, mediaItemSchema),
    setMediaItem: async (folder: string, mediaItem: MediaItem) => {
      const parsed = mediaItemSchema.parse(mediaItem);

      return getFolderDb(folder, DownloadDbKeys.mediaItems).put(parsed.id, parsed);
    },
    removeMediaItemsByIds: async (folder: string, ids: string[]) => {
      const folderMediaItemsDb = getFolderDb(folder, DownloadDbKeys.mediaItems);

      return Promise.all(ids.map(async (id) => folderMediaItemsDb.del(id)));
    },
    removeMediaItems: async (folder: string) => getFolderDb(folder).del(DownloadDbKeys.mediaItems),

    // Relative File Paths
    getRelativeFilePaths: async (folder: string) =>
      getFolderDb(folder).get<RelativeFilePaths>(DownloadDbKeys.relativeFilePaths, relativeFilePathsSchema),
    setRelativeFilePaths: async (folder: string, relativeFilePaths: RelativeFilePaths) =>
      getFolderDb(folder).put(
        DownloadDbKeys.relativeFilePaths,
        Array.from(relativeFilePathsSchema.parse(relativeFilePaths))
      ),
    addRelativeFilePath: async (folder: string, relativePath: string) => {
      const relativeFilePaths = await getters.getRelativeFilePaths(folder);

      relativeFilePaths.add(relativePath);

      await getters.setRelativeFilePaths(folder, relativeFilePaths);
    },
    getAllRelativeFilePaths: async () => {
      const downloadState = await getters.getDownloadState();
      const result = new Set();

      downloadState.folderSummaries.map(async (f) => {
        const relativeFilePaths = await getters.getRelativeFilePaths(f.folder);

        relativeFilePaths.forEach((p) => result.add(p));
      });

      return result;
    },

    // State
    getDownloadState: async () => metadataDb.get<DownloadState>(DownloadDbKeys.state, downloadStateSchema),
    setDownloadState: async (state: Omit<DownloadState, 'updated'>) =>
      metadataDb.put(DownloadDbKeys.state, downloadStateSchema.parse({ ...state, updated: new Date() })),
    updateDownloadState: async (state: Partial<DownloadState>) => {
      const downloadState = await getters.getDownloadState();
      const parsed = downloadStateSchema.parse({ ...downloadState, ...state, updated: new Date() });

      await metadataDb.put(DownloadDbKeys.state, parsed);

      return parsed;
    },

    // Tokens
    getTokens: async () => metadataDb.get<Tokens>(DownloadDbKeys.tokens, tokensSchema, { refreshToken: '' }),
    setTokens: async (tokens: Omit<Tokens, 'updated'>) =>
      metadataDb.put(DownloadDbKeys.tokens, tokensSchema.parse(tokens)),

    // Urls
    getUrls: async () => metadataDb.get<Urls>(DownloadDbKeys.urls, urlsSchema),
    setUrls: async (urls: Urls) => metadataDb.put(DownloadDbKeys.urls, urlsSchema.parse(urls)),
  };

  return getters;
}
