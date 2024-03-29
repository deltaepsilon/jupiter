import axios from 'axios';
import { z } from 'zod';

export const refreshAccessTokenResponse = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  token_type: z.enum(['Bearer']),
});

export async function refreshAccessToken(refreshToken: string) {
  const { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET } = z
    .object({
      GOOGLE_AUTH_CLIENT_ID: z.string(),
      GOOGLE_AUTH_CLIENT_SECRET: z.string(),
    })
    .parse(process.env);

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

  return refreshAccessTokenResponse.parse(response.data);
}
