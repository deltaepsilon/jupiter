import { LevelDatabase } from '../level';
import axios from 'axios';
import { batchGetMediaItemsResponseSchema } from 'data/media-items';
import { createGettersAndSetters } from '../utils';

export async function refreshMediaItems({
  db,
  folder,
  mediaItemIds,
}: {
  db: LevelDatabase;
  folder: string;
  mediaItemIds: string[];
}) {
  const { getTokens, getUrls, setTokens, setMediaItem } = createGettersAndSetters(db);
  const tokens = await getTokens();
  const urls = await getUrls();

  const result = await axios.post(urls.batchGetMediaItems, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    mediaItemIds: mediaItemIds.join(','),
  });
  const { accessToken, refreshToken, expiresAt, invalidMediaIds, mediaItemResults } =
    batchGetMediaItemsResponseSchema.parse(result.data);

  await setTokens({ accessToken, refreshToken, expiresAt: new Date(expiresAt) });

  return {
    invalidMediaIds,
    mediaItems: await Promise.all(
      mediaItemResults.map(async ({ mediaItem }) => {
        await setMediaItem(folder, mediaItem);

        return mediaItem;
      })
    ),
  };
}
