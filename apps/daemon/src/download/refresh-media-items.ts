import axios, { AxiosResponse } from 'axios';

import { LevelDatabase } from '../level';
import { batchGetMediaItemsResponseSchema } from 'data/media-items';
import { createGettersAndSetters } from '../utils';

const MAX_TRIES = 20;

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
  let tries = 0;
  let result: AxiosResponse<any, any> | null = null;

  while (tries < MAX_TRIES) {
    result = await axios
      .post(urls.batchGetMediaItems, {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        mediaItemIds: mediaItemIds.join(','),
      })
      .catch(() => null);

    if (result) {
      break;
    } else {
      tries++;

      await wait(Math.pow(2, tries) * 3000);
    }
  }

  if (!result) {
    throw new Error(`Failed to refresh media items: ${mediaItemIds.length} count`);
  } else {
    console.info(`[refreshMediaItems] success: ${mediaItemIds.length} count`);
  }

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

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
