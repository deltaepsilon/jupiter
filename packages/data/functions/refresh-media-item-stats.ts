import { z } from 'zod';

export const refreshMediaItemStatsParamsSchema = z.object({
  libraryId: z.string(),
  timezoneOffset: z.number().default(() => new Date().getTimezoneOffset()),
  userId: z.string(),
});

export type RefreshMediaItemStatsParams = z.input<typeof refreshMediaItemStatsParamsSchema>;
