import short from 'short-uuid';
import { z } from 'zod';

export const payloadSchema = z.object({ error: z.string().optional(), data: z.any().optional() });

export const postMessageSchema = z.object({
  uuid: z.string().default(() => short.uuid()),
  success: z.boolean().default(true),
  payload: payloadSchema,
});

export interface GetMessageArgs {
  payload: z.infer<typeof postMessageSchema>['payload'];
  success: boolean;
  uuid?: string;
}

export function getMessage({ payload, success, uuid }: GetMessageArgs) {
  return postMessageSchema.parse({ payload, success, uuid });
}
