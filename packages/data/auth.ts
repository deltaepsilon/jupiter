import { z } from 'zod';

export enum Cookie {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
  redirect = 'redirect',
}

export const getAuthUrlRequest = z.object({
  host: z.string(),
  protocol: z.string(),
  redirect: z.string().optional(),
});
export type GetAuthUrlRequest = z.input<typeof getAuthUrlRequest>;

export const getAuthUrlResponse = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  authUrl: z.string().optional(),
  redirect: z.string(),
});
export type GetAuthUrlResponse = z.input<typeof getAuthUrlResponse>;
