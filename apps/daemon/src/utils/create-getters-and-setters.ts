import { DownloadDbKeys, DownloadState, Tokens, downloadStateSchema, tokensSchema } from 'data/daemon';
import { MediaItem, mediaItemSchema } from 'data/media-items';

import { FilesystemDatabase } from 'daemon/src/db';

export type GettersAndSetters = ReturnType<typeof createGettersAndSetters>;

export function createGettersAndSetters(db: FilesystemDatabase) {
  return {
    getState: () => downloadStateSchema.parse(db.get(DownloadDbKeys.state) || undefined),
    setState: (state: Omit<DownloadState, 'updated'>) =>
      db.set<DownloadState>(DownloadDbKeys.state, downloadStateSchema.parse(state)),

    getTokens: () => tokensSchema.parse(db.get(DownloadDbKeys.tokens) || undefined),
    setTokens: (state: Omit<Tokens, 'updated'>) => db.set<Tokens>(DownloadDbKeys.tokens, tokensSchema.parse(state)),

    getMediaItem: (id: string) => mediaItemSchema.parse(db.get(`${DownloadDbKeys.mediaItems}.${id}`) || undefined),
    setMediaItem: (mediaItem: MediaItem) => {
      const parsed = mediaItemSchema.parse(mediaItem);

      db.set<MediaItem>(`${DownloadDbKeys.mediaItems}.${parsed.id}`, parsed);
    },
    removeMediaItems: () => db.remove(DownloadDbKeys.mediaItems),
  };
}
