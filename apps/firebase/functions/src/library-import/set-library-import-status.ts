import * as functions from 'firebase-functions';

import { libraryTaskStatusRequest, libraryTaskStatusResponse } from 'data/library';

import { https } from 'firebase-functions';
import { setStatus } from './set-status';
import { z } from 'zod';

const dataSchema = z.object({ libraryId: z.string() });

type Data = z.infer<typeof dataSchema>;

export async function setLibraryImportStatus(data: Data, context: https.CallableContext) {
  const { libraryId, status } = libraryTaskStatusRequest.parse(data);
  const xCallableContextAuth = context.rawRequest.headers['x-callable-context-auth'] as string;
  const fakeAuth = decodeURIComponent(xCallableContextAuth);
  const fakeAuthParsed = fakeAuth && JSON.parse(fakeAuth);
  const userId = context.auth?.uid || fakeAuthParsed?.uid;
  let success = false;

  if (!userId) {
    throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
  }

  try {
    await setStatus({ libraryId, status, userId });

    success = true;
  } catch (error) {
    console.error(error);
  }

  return libraryTaskStatusResponse.parse({ success });
}
