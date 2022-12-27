import * as api from 'api';
import * as functions from 'firebase-functions';

import { z } from 'zod';

const BODY_SCHEMA = z.object({ refreshToken: z.string() });

export async function refreshAccessToken(req: functions.Request, res: functions.Response) {
  const { refreshToken } = BODY_SCHEMA.parse(req.body);

  const result = await api.refreshAccessToken(refreshToken);

  res.json(result);
}
