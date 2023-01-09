import { BatchGetMediaItemsParams, batchGetMediaItems } from '../../../../../packages/api';

import { error } from '../utils';
import { https } from 'firebase-functions';

export async function batchGet(data: BatchGetMediaItemsParams, context: https.CallableContext) {
  try {
    const { accessToken, refreshToken } = data;

    if (!context.auth) {
      return new https.HttpsError('unauthenticated', 'Unauthorized');
    }

    if (!accessToken && !refreshToken) {
      return new https.HttpsError('internal', 'No access token or refresh token found');
    }

    const media = await batchGetMediaItems(data);

    return media;
  } catch (err) {
    return error('functions/src/media-items/batch-get', err);
  }
}
