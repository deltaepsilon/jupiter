import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { Library, LibraryTaskStatus, libraryImportSchema } from 'data/library';
import { MEDIA_ITEMS_TTL_MS, REFRESH_FROM_TODAY_MS } from '../data';
import { getApp, getLibrary } from '../utils';

import { FIREBASE } from 'data/firebase';
import { MediaItem } from 'data/media-items';
import { listMediaItems } from 'api/photos/list-media-items';
import { setStatus } from './set-status';

export const LIBRARY_IMPORT_PATH = 'user-owned/{userId}/library/{libraryId}/import';

export async function libraryImportOnWrite(
  snapshot: functions.Change<functions.database.DataSnapshot>,
  context: functions.EventContext<{
    libraryId: string;
    userId: string;
  }>
) {
  const { libraryId, userId } = context.params;
  const libraryImportRef = snapshot.after.ref;
  const libraryMediaItemsRef = getApp().database().ref(FIREBASE.DATABASE.PATHS.LIBRARY_MEDIA_ITEMS(userId, libraryId));
  const beforeParsed = libraryImportSchema.safeParse(snapshot.before.val());
  const afterParsed = libraryImportSchema.safeParse(snapshot.after.val());
  const isRunning = afterParsed.success && afterParsed.data.status === LibraryTaskStatus.running;
  const isDestroyed = afterParsed.success && afterParsed.data.status === LibraryTaskStatus.destroyed;

  if (isDestroyed) {
    await libraryImportRef.update({
      nextPageToken: null,
      count: 0,
      status: LibraryTaskStatus.idle,
      updated: new Date(),
    });
    await libraryMediaItemsRef.remove();
  } else if (isRunning) {
    const beforeImport = beforeParsed.success && beforeParsed.data;
    const libraryImport = afterParsed.data;
    const { pageSize } = libraryImport;
    const shouldStartFromBeginning =
      beforeImport && libraryImport.updated.getTime() - beforeImport.updated.getTime() > REFRESH_FROM_TODAY_MS;
    let nextPageToken = shouldStartFromBeginning ? null : libraryImport.nextPageToken;

    console.log({ shouldStartFromBeginning, nextPageToken });

    const { library, librarySnapshot } = await getLibrary({ libraryId, userId });
    const { mediaItems, nextPageToken: maybeNextPageToken } = await getPage({
      library,
      librarySnapshot,
      pageSize,
      nextPageToken,
    });
    const mediaItemsUpdates = getMediaItemUpdates(mediaItems);
    const isLastPage = !maybeNextPageToken;

    if (isLastPage) await setStatus({ libraryId, status: LibraryTaskStatus.complete, userId });
    nextPageToken = maybeNextPageToken;

    await libraryMediaItemsRef.update(mediaItemsUpdates);
    await libraryImportRef.update({
      count: admin.database.ServerValue.increment(mediaItems.length),
      nextPageToken: nextPageToken || null,
      updated: new Date(),
    });

    if (isLastPage) await librarySnapshot.ref.update({ imported: true, updated: new Date() });
  }
}

interface GetPageArgs {
  library: Library;
  librarySnapshot: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>;
  nextPageToken?: string | null;
  pageSize: number;
}
async function getPage({ library, librarySnapshot, pageSize, nextPageToken }: GetPageArgs) {
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

function getMediaItemUpdates(mediaItems: MediaItem[]) {
  return mediaItems.reduce((acc, mediaItem) => {
    acc[`date:${mediaItem.mediaMetadata.creationTime}|id:${mediaItem.id}`] = mediaItem;

    return acc;
  }, {} as Record<string, MediaItem>);
}
