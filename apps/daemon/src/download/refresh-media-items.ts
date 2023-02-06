import { FilesystemDatabase } from '../db';
import axios from 'axios';
import { batchGetMediaItemsResponseSchema } from 'data/media-items';
import { createGettersAndSetters } from '../utils';

export async function refreshMediaItems({
  db,
  folder,
  mediaItemIds,
}: {
  db: FilesystemDatabase;
  folder: string;
  mediaItemIds: string[];
}) {
  const { getTokens, getUrls, setTokens, setMediaItem } = createGettersAndSetters(db);
  const tokens = getTokens();
  const urls = getUrls();

  const result = await axios.post(urls.batchGetMediaItems, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    mediaItemIds: mediaItemIds.join(','),
  });
  const { accessToken, refreshToken, expiresAt, invalidMediaIds, mediaItemResults } =
    batchGetMediaItemsResponseSchema.parse(result.data);

  setTokens({ accessToken, refreshToken, expiresAt: new Date(expiresAt) });

  return { invalidMediaIds, mediaItems: mediaItemResults.map(({ mediaItem }) => setMediaItem(folder, mediaItem)) };
}
