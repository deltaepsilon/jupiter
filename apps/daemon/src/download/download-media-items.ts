import { MediaItem, batchGetMediaItemsResponseSchema } from 'data/media-items';

import { FilesystemDatabase } from '../db';
import { SendMessage } from 'data/daemon';
import axios from 'axios';
import { createGettersAndSetters } from '../utils';

interface Args {
  folder: string;
  mediaItemIds: string[];
  db: FilesystemDatabase;
  sendMessage: SendMessage;
}

export async function downloadMediaItems({ folder, mediaItemIds, db, sendMessage }: Args) {
  const { getMediaItem } = createGettersAndSetters(db);

  /**
   *
   * - Attempt to download it
   * - If the url has expired, add it to a batchGetMediaItems request and update the local copy of the mediaItem
   * - Add mediaItem to filesystem index
   * - Recur
   */

  console.log('mediaItemIds', mediaItemIds);

  return Promise.all(
    mediaItemIds.map(async (mediaItemId) => {
      const { baseUrl } = getMediaItem(folder, mediaItemId);

      console.log({ baseUrl });
    })
  );
}

async function refreshMediaItems({ db, mediaItemIds }: { db: FilesystemDatabase; mediaItemIds: string[] }) {
  const { getTokens, getUrls, setTokens } = createGettersAndSetters(db);
  const tokens = getTokens();
  const urls = getUrls();

  const result = await axios.post(urls.batchGetMediaItems, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    mediaItemIds: mediaItemIds.join(','),
  });
  const { accessToken, refreshToken, expiresAt, mediaItemResults } = batchGetMediaItemsResponseSchema.parse(
    result.data
  );

  setTokens({ accessToken, refreshToken, expiresAt: new Date(expiresAt) });

  return mediaItemResults.map(({ mediaItem }) => mediaItem);
}
