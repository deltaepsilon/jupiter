import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { LibraryImport, LibraryTaskStatus, libraryImportSchema } from 'data/library';
import { getApp, getLibrary } from '../utils';

import { FIREBASE } from 'data/firebase';
import { REFRESH_FROM_TODAY_MS } from '../data';
import { getMediaItemUpdates } from 'data/media-items';
import { getPage } from './get-page';
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
    const isStale =
      beforeImport && libraryImport.updated.getTime() - beforeImport.updated.getTime() > REFRESH_FROM_TODAY_MS;
    const isReadingFromStart = isStale || !!libraryImport.startNextPageToken;
    let nextPageToken = isReadingFromStart ? libraryImport.startNextPageToken || null : libraryImport.nextPageToken;

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

    if (isReadingFromStart) {
      const sortedMediaItemKeys = Object.keys(mediaItemsUpdates).sort();
      const firstMediaItemKey = sortedMediaItemKeys[0];

      if (!sortedMediaItemKeys.length) {
        console.info('media items empty!!!', { library, nextPageToken });

        await libraryImportRef.update({
          status: 'paused',
          updated: new Date(),
        });

        throw new Error('Missing media items when reading from front');
      }

      const query = libraryMediaItemsRef.orderByKey().endAt(firstMediaItemKey).limitToLast(pageSize);
      const snapshot = await query.once('value');
      const existingMediaItemKeys = Object.keys(snapshot.val()).sort();
      const newKeys = sortedMediaItemKeys.filter((key) => !existingMediaItemKeys.includes(key));
      const isAllNewKeys = newKeys.length === sortedMediaItemKeys.length;

      await libraryMediaItemsRef.update(mediaItemsUpdates);
      await libraryImportRef.update({
        count: admin.database.ServerValue.increment(newKeys.length),
        startNextPageToken: isAllNewKeys ? nextPageToken : null,
        updated: new Date(),
      });
    } else {
      const libraryImportUpdates: Partial<LibraryImport> = {
        nextPageToken: nextPageToken || null,
        updated: new Date(),
      };

      if (!nextPageToken && libraryImport.nextPageToken) {
        libraryImportUpdates.endNextPageToken = libraryImport.nextPageToken;

        /**
         * TODO:
         * - Make sure that endNextPageToken is set correctly
         * - Swap endNextPageToken to nextPageToken when restarting the import
         */
      }

      await libraryMediaItemsRef.update(mediaItemsUpdates);
      await libraryImportRef.update({
        count: admin.database.ServerValue.increment(mediaItems.length),
        ...libraryImportUpdates,
      });
    }

    if (isLastPage) await librarySnapshot.ref.update({ imported: true, updated: new Date() });
  }
}
