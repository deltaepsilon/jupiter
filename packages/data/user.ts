import { z } from 'zod';

export const userSchema = z.object({
  displayName: z.string().optional(),
  email: z.string().optional(),
  metadata: z.object({
    createdAt: z.string(),
    creationTime: z.string(),
    lastLoginAt: z.string(),
    lastSignInTime: z.string(),
  }),
  photoURL: z.string().optional(),
  uid: z.string(),
});

export type User = z.infer<typeof userSchema>;
