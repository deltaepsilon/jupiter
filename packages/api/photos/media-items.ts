import { NextApiRequest, NextApiResponse } from 'next';

import { addParams } from 'ui/utils';
import axios from 'axios';
import { getAccessToken } from 'api/utils/jwt';
import { mediaItemsResponseSchema } from 'data/media-items';

interface Args {
  req: NextApiRequest;
  res: NextApiResponse;
}

export async function getMediaItems({ req, res }: Args) {
  const accessToken = await getAccessToken(req, res);

  if (!accessToken) {
    throw new Error('No access token found');
  } else {
    return queryMediaItems({ accessToken, pageSize: 25 });
  }
}

async function queryMediaItems({
  accessToken,
  pageSize = 25,
  pageToken,
}: {
  accessToken: string;
  pageSize?: number;
  pageToken?: string;
}) {
  const { data } = await axios.get(
    addParams('https://photoslibrary.googleapis.com/v1/mediaItems', { pageSize, pageToken }),
    {
      headers: { Authorization: `Bearer ${accessToken}`, ContentType: 'application/json' },
    }
  );

  return mediaItemsResponseSchema.parse(data);
}
