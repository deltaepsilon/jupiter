import { BatchGetMediaItemsParams, batchGetMediaItems } from '../../../../../packages/api';
import { error, getContextAuth } from '../utils';

import { https } from 'firebase-functions';

export async function batchGet(data: BatchGetMediaItemsParams, context: https.CallableContext) {
  try {
    const { accessToken, refreshToken } = data;
    const auth = getContextAuth(context);

    if (!auth.userId) {
      return new https.HttpsError('unauthenticated', 'Unauthorized');
    }

    if (!accessToken && !refreshToken) {
      return new https.HttpsError('internal', 'No access token or refresh token found');
    }

    return batchGetMediaItems(data).catch((err) => {
      return error('functions/src/media-items/batch-get', err);
    });
  } catch (err) {
    return error('functions/src/media-items/batch-get', err);
  }
}
