import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import { getMediaItems } from 'api/photos/media-items';

export default async function MediaItems(req: NextApiRequest, res: NextApiResponse) {
  try {
    const media = await getMediaItems({ req, res });

    res.json(media);
  } catch (error) {
    if (error instanceof Error) {
      if (error.toString().includes('No access token found')) {
        res.status(401).json({ error: 'No access token found' });
      } else {
        res.status(error.response.status || 500).json(error.response.data);
      }
    }
  }
}
