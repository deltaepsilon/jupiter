import { NextApiRequest, NextApiResponse } from 'next';

import { addParams } from 'ui/utils';
import axios from 'axios';
import { batchGetMediaItemsResponseSchema } from 'data/media-items';
import { refreshAccessToken } from 'api/utils/jwt';
import { z } from 'zod';

interface Args {
  req: NextApiRequest;
}

const PARAMS_SCHEMA = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string(),
  mediaItemIds: z.string(),
});

export async function batchGetMediaItems({ req }: Args) {
  const { accessToken: maybeAccessToken, refreshToken, mediaItemIds } = PARAMS_SCHEMA.parse(JSON.parse(req.body));
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
