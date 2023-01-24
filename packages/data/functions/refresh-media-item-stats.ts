import { z } from 'zod';

export const refreshMediaItemStatsParamsSchema = z.object({
  libraryId: z.string(),
  timezoneOffset: z.number(),
  userId: z.string(),
});

export type RefreshMediaItemStatsParams = z.infer<typeof refreshMediaItemStatsParamsSchema>;
