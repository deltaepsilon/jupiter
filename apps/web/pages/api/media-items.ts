import { NextApiRequest, NextApiResponse } from 'next';

import { ZodError } from 'zod';
import axios from 'axios';
import { getMediaItems } from 'api/photos/media-items';

export default async function MediaItems(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.query.accessToken && !req.query.refreshToken) {
      throw new Error('No access token found');
    }

    const media = await getMediaItems({ req });

    res.json(media);
  } catch (error) {
    console.error('api/media-items error: ', error?.toString());

    if (error instanceof Error) {
      if (error.toString().includes('No access token found')) {
        res.status(401).json({ error: 'No access token found' });
      }
      if (error instanceof ZodError) {
        res.status(422).json(error);
      } else {
        // @ts-ignore
        res.status(error.response.status || 500).json(error.response.data);
      }
    }
  }
}
