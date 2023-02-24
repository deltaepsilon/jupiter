import { Libraries, Library, librarySchema } from 'data/library';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore/lite';
import { ref, remove } from 'firebase/database';

import { FIREBASE } from 'data/firebase';
import { MEDIA_ITEMS_TTL_MS } from 'data/media-items';
import { getIsStaleAccessToken } from 'ui/utils';
import { useFirestore, useRtdb } from 'ui/hooks';
import { useGooglePhotos } from 'web/hooks';

type Tokens = { accessToken: string; refreshToken: string };

interface LibrariesValue {
  addLibrary: (tokens: Tokens) => Promise<void>;
  getLibraries: () => Promise<void>;
  isLoading: boolean;
  library?: Library;
  libraries: Libraries;
  refreshLibrary: (libraryId: string, shouldRefreshRecords: boolean) => Promise<boolean>;
  removeLibrary: (libraryId: string) => Promise<void>;
}

const LibrariesContext = createContext<LibrariesValue>({
  addLibrary: async () => {},
  getLibraries: async () => {},
  isLoading: true,
  libraries: [],
  refreshLibrary: async () => false,
  removeLibrary: async () => {},
});

export function useLibraries() {
  return useContext(LibrariesContext);
}

interface Props {
  children: React.ReactNode;
  libraryId?: string;
  userId: string;
}

export function LibrariesProvider({ children, libraryId, userId }: Props) {
  const updateKeysRef = useRef<Set<string>>(new Set());
  const { getFirstPage } = useGooglePhotos();
  const { isLoading: isFirestoreLoading, addDocs, db, getDocTuple, getDocTuples, updateDocs } = useFirestore();
  const { database } = useRtdb();
  const [isLoading, setIsLoading] = useState<LibrariesValue['isLoading']>(true);
  const [libraries, setLibraries] = useState<LibrariesValue['libraries']>([]);
  const [, library] = useMemo(() => libraries.find(([key]) => key === libraryId) ?? [], [libraries, libraryId]);
  const getLibraries = useCallback(async () => {
    if (userId) {
      getDocTuples(FIREBASE.FIRESTORE.COLLECTIONS.LIBRARIES(userId))
        .then((docTuples) => {
          const libraries = docTuples?.map(([key, data]) => [key, librarySchema.parse(data)] as [string, Library]);

          setLibraries(libraries || []);
        })
        .then(() => setIsLoading(false));
    }
  }, [getDocTuples, userId]);
  const getLibrary = useCallback(
    async (libraryId: string) => {
      if (userId) {
        getDocTuple(FIREBASE.FIRESTORE.COLLECTIONS.LIBRARY(userId, libraryId))
          .then((docTuple) => {
            if (docTuple) {
              const [key, data] = docTuple;
              const library = [key, librarySchema.parse(data)] as [string, Library];

              setLibraries(library ? [library] : []);
            }
          })
          .then(() => setIsLoading(false));
      }
    },
    [getDocTuple, userId]
  );
  const addLibrary = useCallback(
    async (tokens: Tokens) => {
      const library = librarySchema.parse(tokens);

      await addDocs(FIREBASE.FIRESTORE.COLLECTIONS.LIBRARIES(userId), [library]);
    },
    [addDocs, userId]
  );
  const updateLibrary = useCallback(
    async (libraryId: string, updates: Partial<Library>) => {
      const libraryPath = FIREBASE.FIRESTORE.COLLECTIONS.LIBRARY(userId, libraryId);

      await updateDocs([[libraryPath, updates]]);
    },
    [updateDocs, userId]
  );
  const removeLibrary = useCallback(
    async (libraryId: string) => {
      if (database && db && libraryId && userId) {
        const firestorePath = FIREBASE.FIRESTORE.COLLECTIONS.LIBRARY(userId, libraryId);
        const databasePath = FIREBASE.DATABASE.PATHS.LIBRARY(userId, libraryId);

        await remove(ref(database, databasePath));
        await deleteDoc(doc(db, firestorePath));

        await getLibraries();
      }
    },
    [database, db, getLibraries, userId]
  );
  const refreshRecords = useCallback(() => {
    libraryId ? getLibrary(libraryId) : getLibraries();
  }, [getLibraries, getLibrary, libraryId]);
  const refreshLibrary = useCallback(
    async (libraryId: string, shouldRefreshRecords: boolean = true) => {
      const [, maybeLibrary] = libraries.find(([key]) => key === libraryId) || [];
      const library = maybeLibrary && librarySchema.parse(maybeLibrary);
      const hasBeenRefreshedAlready = updateKeysRef.current.has(libraryId);

      if (library && !hasBeenRefreshedAlready) {
        const isStaleAccessToken = getIsStaleAccessToken(library.updated);
        const result = await getFirstPage({
          accessToken: isStaleAccessToken ? undefined : library.accessToken,
          refreshToken: library.refreshToken,
        });

        if (result.error) {
          console.error('error', result.error);
          return false;
        } else {
          const { accessToken, mediaItems } = result.data;
          const updates = librarySchema.parse({ ...library, accessToken, mediaItems, updated: new Date() });

          updateKeysRef.current.add(libraryId);

          await updateLibrary(libraryId, updates);

          shouldRefreshRecords && refreshRecords();

          return true;
        }
      }

      return false;
    },
    [getFirstPage, libraries, refreshRecords, updateLibrary]
  );

  useEffect(() => {
    const staleLibraries = libraries.filter(
      ([key, library]) =>
        !updateKeysRef.current.has(key) &&
        (!library.mediaItems || !library.updated || library.updated.getTime() < Date.now() - MEDIA_ITEMS_TTL_MS)
    );

    Promise.all(staleLibraries.map(async ([key]) => refreshLibrary(key, false))).then((refreshed: boolean[]) => {
      const hasRefreshed = refreshed.some((value) => value);

      if (hasRefreshed) {
        console.info('refreshing stale libraries', { staleLibraries });
        refreshRecords();
      }
    });
  }, [libraries, refreshLibrary, refreshRecords]);

  useEffect(() => {
    if (!isFirestoreLoading) {
      refreshRecords();
    }
  }, [isFirestoreLoading, refreshRecords]);

  return (
    <LibrariesContext.Provider
      value={{ addLibrary, getLibraries, isLoading, library, libraries, refreshLibrary, removeLibrary }}
    >
      {children}
    </LibrariesContext.Provider>
  );
}
