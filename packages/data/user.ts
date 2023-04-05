import { z } from 'zod';

export enum CustomClaimRole {
  subscriber = 'subscriber',
}

const subscribedClaims = new Set([CustomClaimRole.subscriber]);

export function getIsSubscribed(customClaimRoleString?: string): boolean {
  if (!customClaimRoleString) {
    return false;
  } else {
    const customClaim = z.nativeEnum(CustomClaimRole).parse(customClaimRoleString);

    return subscribedClaims.has(customClaim);
  }
}

export const userSchema = z.object({
  displayName: z.string().nullish(),
  email: z.string().nullish(),
  metadata: z.object({
    createdAt: z.string(),
    creationTime: z.string(),
    lastLoginAt: z.string(),
    lastSignInTime: z.string(),
  }),
  photoURL: z.string().nullish(),
  uid: z.string(),
});

export type User = z.infer<typeof userSchema>;
