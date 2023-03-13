import * as admin from 'firebase-admin';

import { Library } from 'data/library';
import { listMediaItems } from 'api/photos/list-media-items';

interface GetPageArgs {
  library: Library;
  librarySnapshot: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>;
  nextPageToken?: string | null;
  pageSize: number;
}
export async function getPage({ library, librarySnapshot, pageSize, nextPageToken }: GetPageArgs) {
  const { accessToken, refreshToken } = library;

  const data = await listMediaItems({
    accessToken,
    refreshToken,
    pageSize: String(pageSize),
    nextPageToken: nextPageToken ?? undefined,
  }).catch(async (e) => {
    if (e.response.status === 401) {
      // Try again with no accessToken and reset accessToken
      const result = await listMediaItems({
        refreshToken,
        pageSize: String(pageSize),
        nextPageToken: nextPageToken ?? undefined,
      });

      await librarySnapshot.ref.update({ accessToken: result.accessToken, updated: new Date() });

      return result;
    } else {
      throw e;
    }
  });

  return { mediaItems: data.mediaItems, nextPageToken: data.nextPageToken };
}
