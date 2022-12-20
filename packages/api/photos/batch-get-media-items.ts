import axios from 'axios';
import { batchGetMediaItemsResponseSchema } from 'data/media-items';
import { refreshAccessToken } from '../utils/jwt';
import { z } from 'zod';

const BATCH_GET_MEDIA_ITEMS_PARAMS_SCHEMA = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string(),
  mediaItemIds: z.string(),
});
export type BatchGetMediaItemsParams = z.infer<typeof BATCH_GET_MEDIA_ITEMS_PARAMS_SCHEMA>;

export async function batchGetMediaItems(params: BatchGetMediaItemsParams) {
  const {
    accessToken: maybeAccessToken,
    refreshToken,
    mediaItemIds,
  } = BATCH_GET_MEDIA_ITEMS_PARAMS_SCHEMA.parse(params);
  const accessToken = maybeAccessToken || (await refreshAccessToken(refreshToken)).access_token;

  if (!accessToken) {
    throw new Error('No access token found');
  } else {
    return queryMediaItems({ accessToken, refreshToken, mediaItemIds });
  }
}

async function queryMediaItems({
  accessToken,
  mediaItemIds,
  refreshToken,
}: {
  accessToken: string;
  mediaItemIds: string;
  refreshToken: string;
}) {
  const { data } = await axios.get('https://photoslibrary.googleapis.com/v1/mediaItems:batchGet', {
    params: { mediaItemIds },
    headers: { Authorization: `Bearer ${accessToken}`, ContentType: 'application/json' },
  });

  return batchGetMediaItemsResponseSchema.parse({ accessToken, refreshToken, ...data });
}
