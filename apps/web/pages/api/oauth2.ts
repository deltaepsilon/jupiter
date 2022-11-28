import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies, setCookie } from 'nookies';

import { Cookie } from 'data/sync';
import { google } from 'googleapis';
import { z } from 'zod';

const ONE_HOUR = 60 * 60 * 1;
const ONE_YEAR = 60 * 60 * 24 * 365;

const { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET } = z
  .object({
    GOOGLE_AUTH_CLIENT_ID: z.string(),
    GOOGLE_AUTH_CLIENT_SECRET: z.string(),
  })
  .parse(process.env);
const SCOPES = ['https://www.googleapis.com/auth/photoslibrary.readonly'];

export default async function OAuth2(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers.host;
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const redirectUri = `${protocol}://${host}/api/oauth2`;
  const oauth2Client = new google.auth.OAuth2({
    clientId: GOOGLE_AUTH_CLIENT_ID,
    clientSecret: GOOGLE_AUTH_CLIENT_SECRET,
    redirectUri,
  });
  const isCallback = !!req.query.code;
  const cookies = parseCookies({ req });
  const redirect = typeof req.query.redirect === 'string' ? req.query.redirect : cookies.redirect ?? '/';

  if (isCallback) {
    const { tokens } = await oauth2Client.getToken(req.query.code as string);
    const { access_token, refresh_token } = tokens;

    if (!access_token) {
      throw new Error('access_token missing');
    } else if (!refresh_token) {
      throw new Error('refresh_token missing');
    } else {
      setCookie({ res }, Cookie.accessToken, access_token, { maxAge: ONE_HOUR, path: '/' });
      setCookie({ res }, Cookie.refreshToken, refresh_token, { maxAge: ONE_YEAR, path: '/' });

      typeof redirect === 'string' ? res.redirect(redirect) : res.status(200).send('OK');
    }
  } else {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: SCOPES,
      include_granted_scopes: true,
    });

    setCookie({ res }, 'redirect', redirect, { maxAge: 60 * 5, path: '/' });
    res.json({ authUrl });
  }
}
