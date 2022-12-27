import { GetAuthUrlRequest, getAuthUrlRequest, getAuthUrlResponse } from 'data/auth';

import { google } from 'googleapis';
import { z } from 'zod';

const ENV_SCHEMA = z.object({ GOOGLE_AUTH_CLIENT_ID: z.string(), GOOGLE_AUTH_CLIENT_SECRET: z.string() });
const SCOPES = ['https://www.googleapis.com/auth/photoslibrary.readonly'];

export async function getAuthUrl(data: GetAuthUrlRequest) {
  const { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET } = ENV_SCHEMA.parse(process.env);
  const { host, protocol, redirect: rawRedirect } = getAuthUrlRequest.parse(data);
  const redirectUri = `${protocol}//${host}/api/oauth2`;
  const oauth2Client = new google.auth.OAuth2({
    clientId: GOOGLE_AUTH_CLIENT_ID,
    clientSecret: GOOGLE_AUTH_CLIENT_SECRET,
    redirectUri,
  });
  const redirect = rawRedirect ?? '/';

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
    include_granted_scopes: true,
  });

  return getAuthUrlResponse.parse({ authUrl, redirect });
}
