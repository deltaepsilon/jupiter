import { NextApiRequest, NextApiResponse } from 'next';

import { addParams } from 'ui/utils';
import axios from 'axios';
import { listMediaItemsResponseSchema } from 'data/media-items';
import { refreshAccessToken } from 'api/utils/jwt';
import { z } from 'zod';

interface Args {
  req: NextApiRequest;
}

const PARAMS_SCHEMA = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string(),
  pageSize: z.string().transform((s) => parseInt(s, 10)),
  nextPageToken: z.string().optional(),
});

export async function listMediaItems({ req }: Args) {
  const { accessToken: maybeAccessToken, refreshToken, nextPageToken } = PARAMS_SCHEMA.parse(req.query);
  const accessToken = maybeAccessToken || (await refreshAccessToken(refreshToken)).access_token;
  const pageSize = typeof req.query.pageSize === 'string' ? parseInt(req.query.pageSize, 10) : 25;

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
  const { data } = await axios.get(
    addParams('https://photoslibrary.googleapis.com/v1/mediaItems', { pageSize, pageToken }),
    {
      headers: { Authorization: `Bearer ${accessToken}`, ContentType: 'application/json' },
    }
  );

  return listMediaItemsResponseSchema.parse({ accessToken, refreshToken, ...data });
}
