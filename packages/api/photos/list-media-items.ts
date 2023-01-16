import { listMediaItemsResponseSchema, mediaItemSchema } from 'data/media-items';

import axios from 'axios';
import { refreshAccessToken } from '../utils/jwt';
import { z } from 'zod';

const httpError = z.object({
  httpErrorCode: z.object({
    canonicalName: z.string(),
    status: z.number(),
  }),
});
const listMediaItemsSuccess = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  mediaItems: z.array(mediaItemSchema),
});

const listMediaItemsRequest = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string(),
  pageSize: z
    .string()
    .default('10')
    .transform((s) => parseInt(s, 10)),
  nextPageToken: z.string().optional(),
});
export type ListMediaItemsRequest = z.input<typeof listMediaItemsRequest>;

export const listMediaItemsResponse = z.union([httpError, listMediaItemsSuccess]);
export type ListMediaItemsResponse = z.output<typeof listMediaItemsResponse>;

export async function listMediaItems({
  accessToken: maybeAccessToken,
  refreshToken,
  nextPageToken,
  pageSize: incomingPageSize,
}: ListMediaItemsRequest) {
  const accessToken = maybeAccessToken || (await refreshAccessToken(refreshToken)).access_token;
  const pageSize = typeof incomingPageSize === 'string' ? parseInt(incomingPageSize, 10) : 25;

  if (!accessToken) {
    throw new Error('No access token found');
  } else {
    return queryMediaItems({ accessToken, refreshToken, pageSize, pageToken: nextPageToken });
  }
}

async function queryMediaItems({
  accessToken,
  pageSize = 25,
  pageToken,
  refreshToken,
}: {
  accessToken: string;
  pageSize?: number;
  pageToken?: string;
  refreshToken: string;
}) {
  const { data, request } = await axios.get('https://photoslibrary.googleapis.com/v1/mediaItems', {
    params: { pageSize, pageToken },
    headers: { Authorization: `Bearer ${accessToken}`, ContentType: 'application/json' },
  });

  return listMediaItemsResponseSchema.parse({ accessToken, refreshToken, ...data });
}
