import { MEDIA_ITEMS_TTL_MS, MediaItem, MediaItemRecords, MediaItems } from 'data/media-items';
import { batch, getIsStaleAccessToken } from 'ui/utils';
import { ref, update } from 'firebase/database';
import { useEffect, useMemo, useState } from 'react';
import { useFunctions, useRtdb } from 'ui/hooks';

import { FIREBASE } from 'data/firebase';
import { getMediaItemUpdates } from 'data/media-items';
import { useAuth } from 'ui/contexts';
import { useLibraries } from 'web/contexts';

const MAX_MEDIA_ITEMS_PER_BATCH = 49;

export function useRefreshedMediaItems(libraryId: string, mediaItemRecords: MediaItemRecords) {
  const [mediaItems, setMediaItems] = useState<MediaItems>([]);
  const { batchGetMediaItems } = useFunctions();
  const { database, once } = useRtdb();
  const { userId } = useAuth();
  const { library } = useLibraries();
  const expiredMediaItemEntries = useMemo(
    () =>
      Object.entries(mediaItemRecords).filter(
        ([, mediaItem]) => new Date().getTime() - new Date(mediaItem.updated).getTime() > MEDIA_ITEMS_TTL_MS
      ),
    [mediaItemRecords]
  );
  const sortedMediaItems = useMemo(
    () => mediaItems.sort((a, b) => (a.mediaMetadata.creationTime < b.mediaMetadata.creationTime ? 1 : -1)),
    [mediaItems]
  );

  useEffect(() => {
    if (expiredMediaItemEntries.length && database && library && userId) {
      (async () => {
        const isStaleAccessToken = getIsStaleAccessToken(library.updated);
        const mediaItemsRef = ref(database, FIREBASE.DATABASE.PATHS.LIBRARY_MEDIA_ITEMS(userId, libraryId));
        const accessToken = isStaleAccessToken ? undefined : library.accessToken;

        const batches = batch<string>(
          expiredMediaItemEntries.map(([, mediaItem]) => mediaItem.id),
          MAX_MEDIA_ITEMS_PER_BATCH
        );
        const batchedMediaItems = await Promise.all(
          batches.map(async (mediaItemIds) => {
            const { mediaItemResults } = await batchGetMediaItems({
              accessToken,
              refreshToken: library.refreshToken,
              mediaItemIds: mediaItemIds.join(','),
            });

            return mediaItemResults.map(({ mediaItem }) => mediaItem);
          })
        );
        const mediaItems = batchedMediaItems.flat();
        const updates = getMediaItemUpdates(mediaItems);
        const mediaItemsById = mediaItems.reduce(
          (acc, mediaItem) => ((acc[mediaItem.id] = mediaItem), acc),
          {} as Record<string, MediaItem>
        );
        const updatedMediaItems = Object.values(mediaItemRecords).map(
          (mediaItem) => mediaItemsById[mediaItem.id] ?? mediaItem
        );

        setMediaItems(updatedMediaItems);

        await update(mediaItemsRef, updates);
      })();
    } else {
      setMediaItems(Object.values(mediaItemRecords));
    }
  }, [batchGetMediaItems, database, expiredMediaItemEntries, library, libraryId, mediaItemRecords, userId]);

  return sortedMediaItems;
}
