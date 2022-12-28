import {
  Directory,
  DirectoryDbKeys,
  DownloadDbKeys,
  DownloadState,
  FileIndex,
  IngestedIds,
  Tokens,
  Urls,
  directorySchema,
  downloadStateSchema,
  fileIndexSchema,
  ingestedIdsSchema,
  tokensSchema,
  urlsSchema,
} from 'data/daemon';
import { MediaItem, mediaItemSchema } from 'data/media-items';

import { FilesystemDatabase } from 'daemon/src/db';

export type GettersAndSetters = ReturnType<typeof createGettersAndSetters>;

export function createGettersAndSetters(db: FilesystemDatabase) {
  return {
    getDirectory: () => directorySchema.parse(db.get(DirectoryDbKeys.directory) || undefined),
    setDirectory: (directory: Directory) =>
      db.set<Directory>(DirectoryDbKeys.directory, directorySchema.parse(directory)),

    getState: () => downloadStateSchema.parse(db.get(DownloadDbKeys.state) || undefined),
    setState: (state: Omit<DownloadState, 'updated'>) =>
      db.set<DownloadState>(DownloadDbKeys.state, downloadStateSchema.parse(state)),

    getTokens: () => tokensSchema.parse(db.get(DownloadDbKeys.tokens) || undefined),
    setTokens: (tokens: Omit<Tokens, 'updated'>) => db.set<Tokens>(DownloadDbKeys.tokens, tokensSchema.parse(tokens)),

    getIngestedIds: () => ingestedIdsSchema.parse(db.get(DownloadDbKeys.ingestedIds) || []),
    setIngestedIds: (ingestedIds: IngestedIds) =>
      db.set<string[]>(DownloadDbKeys.ingestedIds, Array.from(ingestedIdsSchema.parse(ingestedIds))),

    getMediaItem: (id: string) => mediaItemSchema.parse(db.get(`${DownloadDbKeys.mediaItems}.${id}`) || undefined),
    setMediaItem: (mediaItem: MediaItem) => {
      const parsed = mediaItemSchema.parse(mediaItem);

      db.set<MediaItem>(`${DownloadDbKeys.mediaItems}.${parsed.id}`, parsed);
    },
    removeMediaItems: () => db.remove(DownloadDbKeys.mediaItems),

    getUrls: () => urlsSchema.parse(db.get(DownloadDbKeys.urls) || []),
    setUrls: (urls: Urls) => db.set<Urls>(DownloadDbKeys.urls, urlsSchema.parse(urls)),

    getFileIndex: (md5: string) => urlsSchema.parse(db.get(`${DownloadDbKeys.files}.${md5}`) || null),
    setFileIndex: (file: FileIndex) => {
      const fileIndex = fileIndexSchema.parse(file);

      return db.set<FileIndex>(`${DownloadDbKeys.files}.${fileIndex.md5}`, fileIndex);
    },
  };
}
