import { NextApiRequest, NextApiResponse } from 'next';

import { ZodError } from 'zod';
import { listMediaItems } from 'api/photos/list-media-items';

export default async function handleList(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.query.accessToken && !req.query.refreshToken) {
      throw new Error('No access token found');
    }

    const media = await listMediaItems({ req });

    res.json(media);
  } catch (error) {
    console.error('api/media-items/list error: ', error?.toString());

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
