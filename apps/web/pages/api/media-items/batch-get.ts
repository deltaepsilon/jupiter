import { NextApiRequest, NextApiResponse } from 'next';

import { ZodError } from 'zod';
import { batchGetMediaItems } from 'api/photos/batch-get-media-items';

export default async function handleBatchGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken, refreshToken } = JSON.parse(req.body);

    if (!accessToken && !refreshToken) {
      throw new Error('No access token or refresh token found');
    }

    const media = await batchGetMediaItems({ req });

    res.json(media);
  } catch (error) {
    console.error('api/media-items/batch-get error: ', error?.toString());

    if (error instanceof Error) {
      if (error.toString().includes('No access token found')) {
        res.status(401).json({ error: 'No access token found' });
      }
      if (error instanceof ZodError) {
        res.status(422).json(error);
      } else {
        // @ts-ignore
        res.status(error?.response?.status || 500).json(error?.response?.data || { error: error.toString() });
      }
    }
  }
}
