import { MediaItem, batchGetMediaItemsResponseSchema } from 'data/media-items';
import { createGettersAndSetters, refreshTokens } from '../utils';

import { FilesystemDatabase } from '../db';
import { SendMessage } from 'data/daemon';
import axios from 'axios';

export async function startDownload({ db, sendMessage }: { db: FilesystemDatabase; sendMessage: SendMessage }) {
  const { getIngestedIds, getState, getTokens, getUrls, setTokens } = createGettersAndSetters(db);
  const tokens = getTokens();
  const state = getState();
  const urls = getUrls();
  const ingestedIds = getIngestedIds();
  const mediaItemId = [...ingestedIds][0];

  if (state.isRunning) {
    try {
      const result = await axios.post(urls.batchGetMediaItems, {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        mediaItemIds: [mediaItemId].join(','),
      });
      const { accessToken, refreshToken, expiresAt, mediaItemResults } = batchGetMediaItemsResponseSchema.parse(
        result.data
      );

      const results = await Promise.all(mediaItemResults.map(async ({ mediaItem }) => writeMediaItem(mediaItem)));

      setTokens({ accessToken, refreshToken, expiresAt: new Date(expiresAt) });

      console.log('results', results);
    } catch (error) {
      console.log('error', error);
    }
  }

  /**
   * - Check if state.isRunning is true
   * - Find the next undownloaded media item
   * - Attempt to download it
   * - Refresh the tokens if necessary
   * - Recur
   */
}

async function writeMediaItem(mediaItem: MediaItem) {
  return { id: mediaItem.id };
}
