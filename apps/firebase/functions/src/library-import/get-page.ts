import * as admin from 'firebase-admin';

import { Library } from 'data/library';
import { MEDIA_ITEMS_TTL_MS } from 'data/media-items';
import { listMediaItems } from 'api/photos/list-media-items';

interface GetPageArgs {
  library: Library;
  librarySnapshot: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>;
  nextPageToken?: string | null;
  pageSize: number;
}
export async function getPage({ library, librarySnapshot, pageSize, nextPageToken }: GetPageArgs) {
  const { accessToken, refreshToken, updated } = library;
  const isStale = !updated || updated.getTime() < Date.now() - MEDIA_ITEMS_TTL_MS;

  const data = await listMediaItems({
    accessToken: isStale ? undefined : accessToken,
    refreshToken,
    pageSize: String(pageSize),
    nextPageToken: nextPageToken ?? undefined,
  });

  if (isStale) {
    await librarySnapshot.ref.update({ accessToken: data.accessToken, updated: new Date() });
  }

  return { mediaItems: data.mediaItems, nextPageToken: data.nextPageToken };
}
