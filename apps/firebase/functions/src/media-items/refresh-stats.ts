import { LibraryImportStatsMap, dateSchema, libraryImportStatsSchema, monthSchema, yearSchema } from 'data/library';
import { RefreshMediaItemStatsParams, refreshMediaItemStatsParamsSchema } from 'data/functions';
import { error, getApp, getContextAuth } from '../utils';

import { FIREBASE } from 'data/firebase';
import { https } from 'firebase-functions';
import { mediaItemSchema } from 'data/media-items';

export async function refreshStats(data: RefreshMediaItemStatsParams, context: https.CallableContext) {
  try {
    const auth = getContextAuth(context);

    if (!auth.userId) {
      return new https.HttpsError('unauthenticated', 'Unauthorized');
    }

    const { libraryId, userId } = refreshMediaItemStatsParamsSchema.parse({
      libraryId: data.libraryId,
      userId: auth.userId,
    });

    return refresh({ libraryId, userId });
  } catch (err) {
    return error('functions/src/media-items/batch-get', err);
  }
}

async function refresh({ libraryId, userId }: RefreshMediaItemStatsParams) {
  const database = getApp().database();
  const importRef = database.ref(FIREBASE.DATABASE.PATHS.LIBRARY_IMPORT(userId, libraryId));
  const mediaItemsRef = database.ref(FIREBASE.DATABASE.PATHS.LIBRARY_MEDIA_ITEMS(userId, libraryId));
  const statsRef = database.ref(FIREBASE.DATABASE.PATHS.LIBRARY_STATS(userId, libraryId));
  const mediaItemsSnapshot = await mediaItemsRef.once('value');
  const mediaItems = mediaItemsSnapshot.val();
  const statsMap = Object.entries(mediaItems).reduce(
    (acc, [key, value]) => {
      const mediaItem = mediaItemSchema.parse(value);
      const createdDate = new Date(mediaItem.mediaMetadata.creationTime);
      const year = createdDate.getUTCFullYear();
      const month = createdDate.getUTCMonth() + 1;
      const date = createdDate.getUTCDate();
      const yearId = String(year);
      const monthId = `${yearId}-${month}`;
      const dateId = `${yearId}-${monthId}-${date}`;

      if (!acc.years[yearId]) {
        acc.years[yearId] = yearSchema.parse({ id: yearId, year, count: 0, lastKey: key });
      }

      if (!acc.months[monthId]) {
        acc.months[monthId] = monthSchema.parse({ id: monthId, year, month, count: 0, lastKey: key });
      }

      if (!acc.dates[dateId]) {
        acc.dates[dateId] = dateSchema.parse({ id: dateId, year, month, date, count: 0, lastKey: key });
      }

      acc.years[yearId].count += 1;
      acc.months[monthId].count += 1;
      acc.dates[dateId].count += 1;

      if (acc.years[yearId].lastKey < key) {
        acc.years[yearId].lastKey = key;
      }

      if (acc.months[monthId].lastKey < key) {
        acc.months[monthId].lastKey = key;
      }

      if (acc.dates[dateId].lastKey < key) {
        acc.dates[dateId].lastKey = key;
      }

      return acc;
    },
    { years: {}, months: {}, dates: {} } as LibraryImportStatsMap
  );
  const stats = libraryImportStatsSchema.parse({
    years: Object.values(statsMap.years).sort((a, b) => (a.year < b.year ? 1 : -1)),
    months: Object.values(statsMap.months).sort((a, b) =>
      a.year === b.year ? (a.month < b.month ? 1 : -1) : a.year < b.year ? 1 : -1
    ),
    dates: Object.values(statsMap.dates).sort((a, b) =>
      a.year === b.year
        ? a.month < b.month
          ? 1
          : -1
        : a.month === b.month
        ? a.month < b.month
          ? 1
          : -1
        : a.year < b.year
        ? 1
        : -1
    ),
  });

  await statsRef.set(stats);
  await importRef.update({ count: Object.keys(mediaItems).length });

  return stats;
}
