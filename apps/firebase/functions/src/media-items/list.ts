import { ListMediaItemsRequest, listMediaItems } from 'api/photos/list-media-items';

import { error } from '../utils';
import { https } from 'firebase-functions';

export async function list(data: ListMediaItemsRequest) {
  try {
    const { accessToken, refreshToken } = data;

    if (!accessToken && !refreshToken) {
      return new https.HttpsError('internal', 'No access token or refresh token found');
    }

    return listMediaItems(data);
  } catch (err) {
    return error('api/media-items/list error', err);
  }
}
