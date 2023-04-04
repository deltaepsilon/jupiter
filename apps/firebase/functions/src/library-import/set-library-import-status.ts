import * as functions from 'firebase-functions';

import { getApp, getContextAuth } from '../utils';
import { libraryTaskStatusRequest, libraryTaskStatusResponse } from 'data/library';

import { getIsSubscribed } from 'data/user';
import { https } from 'firebase-functions';
import { setStatus } from './set-status';
import { z } from 'zod';

const dataSchema = z.object({ libraryId: z.string() });

type Data = z.infer<typeof dataSchema>;

export async function setLibraryImportStatus(data: Data, context: https.CallableContext) {
  const { libraryId, status } = libraryTaskStatusRequest.parse(data);
  const { userId } = getContextAuth(context);

  const userRecord = await getApp().auth().getUser(userId);
  const isSubscribed = getIsSubscribed(userRecord.customClaims?.stripeRole);
  let success = false;

  if (!userId) {
    throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
  }

  try {
    await setStatus({ libraryId, isSubscribed, status, userId });

    success = true;
  } catch (error) {
    console.error(error);
  }

  return libraryTaskStatusResponse.parse({ success });
}
