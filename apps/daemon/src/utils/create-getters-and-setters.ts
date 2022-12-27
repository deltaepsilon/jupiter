import {
  DownloadDbKeys,
  DownloadState,
  IngestedIds,
  Tokens,
  Urls,
  downloadStateSchema,
  ingestedIdsSchema,
  tokensSchema,
  urlsSchema,
} from 'data/daemon';
import { MediaItem, mediaItemSchema } from 'data/media-items';

import { FilesystemDatabase } from 'daemon/src/db';

export type GettersAndSetters = ReturnType<typeof createGettersAndSetters>;

export function createGettersAndSetters(db: FilesystemDatabase) {
  return {
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
  };
}
