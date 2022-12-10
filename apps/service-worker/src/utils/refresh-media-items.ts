import { BatchGetMediaItemsResponse, MediaItem, MediaItemTuple, MediaItemTuples } from 'data/media-items';
import { DatabaseReference, update } from 'firebase/database';
import { DocumentData, DocumentSnapshot, updateDoc } from 'firebase/firestore/lite';

import { Library } from 'data/library';
import { MEDIA_ITEMS_TTL_MS } from '../data';
import { WEB } from 'data/web';
import { batchGetMediaItemsResponseSchema } from 'data/media-items';

interface Args {
  library: Library;
  librarySnapshot: DocumentSnapshot<DocumentData>;
  mediaItemsRef: DatabaseReference;
  mediaItemTuples: MediaItemTuples;
}

export async function refreshMediaItems({ library, librarySnapshot, mediaItemsRef, mediaItemTuples }: Args) {
  const updatedMediaItemTuples = await updateStale({ library, librarySnapshot, mediaItemTuples });
  const updates = updatedMediaItemTuples.reduce((acc, [key, mediaItem]) => {
    acc[key] = mediaItem;

    return acc;
  }, {} as Record<string, MediaItem>);
  const updatedTuples = mediaItemTuples.map(([key, mediaItem]) => {
    const updatedMediaItem = updates[key];

    return (updatedMediaItem ? [key, updatedMediaItem] : [key, mediaItem]) as MediaItemTuple;
  }) as MediaItemTuples;

  await update(mediaItemsRef, updates);

  return updatedTuples;
}

async function updateStale({
  library,
  librarySnapshot,
  mediaItemTuples,
}: {
  library: Library;
  librarySnapshot: DocumentSnapshot<DocumentData>;
  mediaItemTuples: MediaItemTuples;
}): Promise<MediaItemTuples> {
  const staleMediaItemTuples = mediaItemTuples.filter(
    ([, { updated }]) => !updated || updated.getTime() < Date.now() - MEDIA_ITEMS_TTL_MS
  );

  if (!!staleMediaItemTuples.length) {
    const staleMediaItemIds = staleMediaItemTuples.map(([, mediaItem]) => mediaItem.id);

    const { accessToken, refreshToken, mediaItemResults } = await batchGetMediaItems({
      library,
      mediaItemIds: staleMediaItemIds,
    });
    const updatedMediaItemTuples = mediaItemResults.map((r) => {
      const [key] = staleMediaItemTuples.find(([, mediaItem]) => mediaItem.id === r.mediaItem.id) || [];

      if (!key) {
        throw new Error(`No key found for mediaItem: ${r.mediaItem.id}`);
      } else {
        return [key, r.mediaItem] as [string, MediaItem];
      }
    });

    await updateDoc(librarySnapshot.ref, { accessToken, refreshToken, updated: new Date() });

    return updatedMediaItemTuples;
  } else {
    return [];
  }
}

async function batchGetMediaItems({
  forceTokenRefresh = false,
  library,
  mediaItemIds,
}: {
  forceTokenRefresh?: boolean;
  library: Library;
  mediaItemIds: string[];
}): Promise<BatchGetMediaItemsResponse> {
  if (mediaItemIds.length > 50) {
    throw new Error('batchGetMediaItems: mediaItemIds length must be less than 50');
  }

  const { accessToken, refreshToken, updated } = library;
  const isStale = forceTokenRefresh || !updated || updated.getTime() < Date.now() - MEDIA_ITEMS_TTL_MS;

  const response = await fetch(`${location.origin}${WEB.API.MEDIA_ITEMS_BATCH_GET}`, {
    method: 'POST',
    body: JSON.stringify({
      accessToken: isStale ? undefined : accessToken,
      refreshToken,
      mediaItemIds: mediaItemIds.join(','),
    }),
  });
  const data = await response.json();

  if (response.status === 401 && !forceTokenRefresh) {
    return batchGetMediaItems({ forceTokenRefresh: true, library, mediaItemIds });
  } else if (!response.ok) {
    throw new Error(data.error.toString() || response.statusText);
  }

  console.log('batchGetMediaItems', data);

  return batchGetMediaItemsResponseSchema.parse(data);
}
