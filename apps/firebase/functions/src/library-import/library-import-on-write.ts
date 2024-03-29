import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { LibraryImport, LibraryTaskStatus, MAX_UNSUBCRIBED_COUNT, libraryImportSchema } from 'data/library';
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
  const isSubscribeBlocked =
    afterParsed.success && !afterParsed.data.isSubscribed && afterParsed.data.count > MAX_UNSUBCRIBED_COUNT;

  if (isDestroyed) {
    await libraryImportRef.update({
      nextPageToken: null,
      count: 0,
      status: LibraryTaskStatus.idle,
      updated: new Date(),
    });
    await libraryMediaItemsRef.remove();
  } else if (isRunning && isSubscribeBlocked) {
    console.info('isSubscribeBlocked', { libraryId, userId });

    await setStatus({ libraryId, isSubscribed: afterParsed.data.isSubscribed, status: LibraryTaskStatus.idle, userId });
  } else if (isRunning) {
    const beforeImport = beforeParsed.success && beforeParsed.data;
    const libraryImport = afterParsed.data;
    const { isSubscribed, pageSize } = libraryImport;
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
    const priorNextPageToken = beforeImport && beforeImport.nextPageToken;
    const isLastPage = !maybeNextPageToken || priorNextPageToken === maybeNextPageToken;

    if (isLastPage) await setStatus({ libraryId, isSubscribed, status: LibraryTaskStatus.complete, userId });
    nextPageToken = maybeNextPageToken;

    /**
     * Strategy:
     *
     * Always read from the beginning of the list of the import is stale, or if we're currently reading from the start.
     * We'll know when the "read from start" operation is through, because the ids will begin to overlap with
     * existing ids, so we delete startNextPageToken and continue reading from the end.
     *
     * The big question is how to read from the end.
     *
     * I'm currently leaning toward NOT deleting nextPageToken when we're done reading from the end.
     * The issue is that a user could spam the "restart" button and keep reading the same records from the end.
     *
     * This isn't a big deal, as the read/write itself is idempotent, but it screws with the counts.
     *
     * Refreshing the import stats will always reset the count, so maybe we just force that to happen whenever the
     * import is complete??? I'll do that from the front-end. I'll force a call to refreshStats.
     *
     * Note: I've forced a refresh of the stats. It's great. A little janky... but reliable.
     */

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
        // Don't drop the nextPageToken if we're on the last page. Any future restart would begin from the first image.
        nextPageToken: nextPageToken || priorNextPageToken || null,
        updated: new Date(),
      };

      if (libraryImportUpdates.nextPageToken === null) {
        // Attempting to preserver nextPageToken if possible
        delete libraryImportUpdates.nextPageToken;
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
