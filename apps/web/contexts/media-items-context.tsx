import { LibraryImportStats, libraryImportStatsSchema } from 'data/library';
import { MediaItem, MediaItemRecords, mediaItemSchema } from 'data/media-items';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { endAt, get, limitToFirst, limitToLast, orderByKey, query, ref, startAt } from 'firebase/database';
import { useFunctions, useRtdb } from 'ui/hooks';

import { FIREBASE } from 'data/firebase';
import { useAuth } from 'ui/contexts';

const LIBRARY_IMPORT_TTL = 1000 * 60 * 60 * 1; // 1 hour

type MediaItemsMap = Map<string, MediaItemRecords>;

interface MediaItemsValue {
  getMediaItems: (lastKey: string, count: number) => Promise<MediaItemRecords>;
  isLoading: boolean;
  libraryId: string;
  libraryImportStats: LibraryImportStats | null;
  refresh: () => {};
}

const DEFAULT_VALUE: MediaItemsValue = {
  getMediaItems: () => Promise.resolve({}),
  isLoading: false,
  libraryId: '',
  libraryImportStats: libraryImportStatsSchema.parse(undefined),
  refresh: async () => {},
};

const MediaItemsContext = createContext(DEFAULT_VALUE);

export function useMediaItems() {
  return useContext(MediaItemsContext);
}

interface Props {
  children: React.ReactNode;
  libraryId: string;
}

export function MediaItemsProvider({ children, libraryId }: Props) {
  const mediaItemsMapRef = useRef<MediaItemsMap>(new Map());
  const [libraryImportStats, setLibraryImportStats] = useState<LibraryImportStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { database, listen } = useRtdb();
  const { userId } = useAuth();
  const { refreshMediaItemStats } = useFunctions();
  const refresh = useCallback(async () => {
    if (userId) {
      setIsLoading(true);

      await refreshMediaItemStats({ libraryId, userId });

      setIsLoading(false);
    }
  }, [libraryId, refreshMediaItemStats, userId]);
  const getMediaItems = useCallback(
    async (lastKey: string, count: number) => {
      if (database && userId) {
        const key = `${count}:${lastKey}`;
        const cached = mediaItemsMapRef.current.get(key);

        if (cached) return cached;

        const mediaItemsPath = FIREBASE.DATABASE.PATHS.LIBRARY_MEDIA_ITEMS(userId, libraryId);
        const mediaItemsQuery = query(ref(database, mediaItemsPath), orderByKey(), endAt(lastKey), limitToLast(count));
        const snapshot = await get(mediaItemsQuery);
        const result = Object.entries(snapshot.val()).reduce((acc, [key, value]) => {
          acc[key] = mediaItemSchema.parse(value);

          return acc;
        }, {} as MediaItemRecords);

        mediaItemsMapRef.current.set(key, result);

        return result;
      } else {
        return {} as MediaItemRecords;
      }
    },
    [database, libraryId, userId]
  );

  useEffect(() => {
    if (!userId) return;

    return listen(FIREBASE.DATABASE.PATHS.LIBRARY_STATS(userId, libraryId), (snapshot) => {
      const parsed = libraryImportStatsSchema.safeParse(snapshot.val());

      if (parsed.success) {
        setLibraryImportStats(parsed.data);
      } else {
        setLibraryImportStats(null);
      }
    });
  }, [libraryId, listen, userId]);

  useEffect(() => {
    if (libraryImportStats) {
      const isStale = libraryImportStats && libraryImportStats.created.getTime() < Date.now() - LIBRARY_IMPORT_TTL;

      isStale && refresh();
    }
  }, [libraryImportStats, refresh]);

  return (
    <MediaItemsContext.Provider value={{ getMediaItems, isLoading, libraryId, libraryImportStats, refresh }}>
      {children}
    </MediaItemsContext.Provider>
  );
}
