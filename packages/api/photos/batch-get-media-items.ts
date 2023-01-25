import axios from 'axios';
import { batchGetMediaItemsResponseSchema } from 'data/media-items';
import { refreshAccessToken } from '../utils/jwt';
import { z } from 'zod';

export const batchGetMediaItemsParamsSchema = z.object({
  accessToken: z.string().nullish(),
  refreshToken: z.string(),
  mediaItemIds: z.string(),
});
export type BatchGetMediaItemsParams = z.infer<typeof batchGetMediaItemsParamsSchema>;

export async function batchGetMediaItems(params: BatchGetMediaItemsParams) {
  const { accessToken: maybeAccessToken, refreshToken, mediaItemIds } = batchGetMediaItemsParamsSchema.parse(params);
  let accessToken = maybeAccessToken;
  let expiresAt = 0;

  if (!accessToken) {
    const { access_token, expires_in } = await refreshAccessToken(refreshToken);

    accessToken = access_token;
    expiresAt = Date.now() + expires_in * 1000;
  }

  if (!accessToken) {
    throw new Error('No access token found');
  } else {
    return queryMediaItems({ accessToken, refreshToken, expiresAt, mediaItemIds: mediaItemIds.split(',') });
  }
}

async function queryMediaItems({
  accessToken,
  expiresAt,
  mediaItemIds,
  refreshToken,
}: {
  accessToken: string;
  expiresAt: number;
  mediaItemIds: string[];
  refreshToken: string;
}) {
  const url = `https://photoslibrary.googleapis.com/v1/mediaItems:batchGet?mediaItemIds=${mediaItemIds.join(
    '&mediaItemIds='
  )}`;

  const response = await axios
    .get(url, {
      headers: { Authorization: `Bearer ${accessToken}`, ContentType: 'application/json' },
    })
    .catch((error) => {
      throw error.response.data;
    });

  if (response.status === 400) {
    throw new Error('400 error');
  } else if (response.status !== 200) {
    throw new Error('Unknown error');
  }

  return batchGetMediaItemsResponseSchema.parse({
    accessToken,
    refreshToken,
    expiresAt: new Date(expiresAt).toISOString(),
    ...response.data,
  });
}
