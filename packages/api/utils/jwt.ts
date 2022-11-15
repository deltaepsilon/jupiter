import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies, setCookie } from 'nookies';

import { Auth } from 'firebase/auth';
import { Cookie } from 'data/sync';
import { addParams } from 'ui/utils';
import axios from 'axios';
import { google } from 'googleapis';
import { z } from 'zod';

const { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET } = z
  .object({
    GOOGLE_AUTH_CLIENT_ID: z.string(),
    GOOGLE_AUTH_CLIENT_SECRET: z.string(),
  })
  .parse(process.env);

const COOKIES_SCHEMA = z.object({ [Cookie.accessToken]: z.string().optional(), [Cookie.refreshToken]: z.string() });
// const CREDENTIAL_SCHEMA = z.object({
//   idToken: z.string(),
//   accessToken: z.string(),
//   pendingToken: z.string().nullable(),
//   providerId: z.string(),
//   signInMethod: z.string(),
// });
// const JWT_SCHEMA = z.object({
//   name: z.string(),
//   picture: z.string(),
//   iss: z.string().nullable(),
//   aud: z.string(),
//   auth_time: z.number(),
//   sub: z.string(),
//   iat: z.number(),
//   exp: z.number(),
//   email: z.string(),
//   email_verified: z.boolean(),
//   firebase: z.object({
//     identities: z.object({ 'google.com': z.array(z.string()), email: z.array(z.string()) }),
//     sign_in_provider: z.string(),
//   }),
// });

export async function getAccessToken(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = getCookies(req);

    if (cookies.accessToken) {
      return cookies.accessToken;
    } else if (!cookies.accessToken && cookies.refreshToken) {
      const { access_token, expires_in } = await refreshAccessToken(cookies.refreshToken);

      setCookie({ res }, 'accessToken', access_token, { maxAge: expires_in * 1000, path: '/' });

      return access_token;
    }
  } catch (error) {
    return false;
  }
}

export async function refreshAccessToken(refreshToken: string) {
  const response = await axios.post(
    'https://oauth2.googleapis.com/token',
    {
      client_id: GOOGLE_AUTH_CLIENT_ID,
      client_secret: GOOGLE_AUTH_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    },
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  return z
    .object({ access_token: z.string(), expires_in: z.number(), scope: z.string(), token_type: z.enum(['Bearer']) })
    .parse(response.data);
}

function getCookies(req: NextApiRequest) {
  const cookies = parseCookies({ req });

  return COOKIES_SCHEMA.parse(cookies);
}
