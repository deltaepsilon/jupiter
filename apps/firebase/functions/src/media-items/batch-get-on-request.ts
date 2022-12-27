import { Request, Response } from 'firebase-functions';

import { AxiosError } from 'axios';
import { batchGetMediaItems } from '../../../../../packages/api';
import { z } from 'zod';

const BODY_SCHEMA = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string(),
  mediaItemIds: z.string(),
});

export async function batchGetOnRequest(req: Request, res: Response) {
  try {
    const { accessToken, refreshToken, mediaItemIds } = BODY_SCHEMA.parse(req.body);

    if (!accessToken && !refreshToken) {
      res.status(400).send('No access token or refresh token provided');
    } else {
      const media = await batchGetMediaItems({ accessToken, refreshToken, mediaItemIds });

      res.json(media);
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      res.status(500).send(err.message);
    } else {
      console.error(err);
      res.status(500).send('internal server error');
    }
  }
}
