import { batchGetMediaItemsResponseSchema, mediaItemSchema } from 'data/media-items';

import axios from 'axios';
import { refreshAccessToken } from '../utils/jwt';
import { z } from 'zod';

const INVALID_MEDIA_ID_CODE = 3;

export const batchGetMediaItemsParamsSchema = z.object({
  accessToken: z.string().nullish(),
  refreshToken: z.string(),
  mediaItemIds: z.string(),
});
export type BatchGetMediaItemsParams = z.infer<typeof batchGetMediaItemsParamsSchema>;

const batchGetSuccessResult = z.object({ mediaItem: mediaItemSchema });
const batchGetErrorResult = z.object({ status: z.object({ code: z.number(), message: z.string() }) });
const responseDataSchema = z.object({
  mediaItemResults: z.array(z.union([batchGetSuccessResult, batchGetErrorResult])),
});
type BatchGetSuccessResult = z.infer<typeof batchGetSuccessResult>;
type BatchGetErrorResult = z.infer<typeof batchGetErrorResult>;

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

  const responseData = responseDataSchema.parse(response.data);
  const results = responseData.mediaItemResults.reduce<{
    invalidMediaIds: string[];
    mediaItemResults: BatchGetSuccessResult[];
  }>(
    (acc, r, index) => {
      const parsedSuccess = batchGetSuccessResult.safeParse(r);
      const parsedError = batchGetErrorResult.safeParse(r);

      if (parsedError.success && parsedError.data.status.code === INVALID_MEDIA_ID_CODE) {
        acc.invalidMediaIds.push(mediaItemIds[index]);
      } else if (parsedSuccess.success) {
        acc.mediaItemResults.push(parsedSuccess.data);
      }

      return acc;
    },
    { invalidMediaIds: [], mediaItemResults: [] }
  );

  return batchGetMediaItemsResponseSchema.parse({
    accessToken,
    refreshToken,
    expiresAt: new Date(expiresAt).toISOString(),
    ...results,
  });
}
