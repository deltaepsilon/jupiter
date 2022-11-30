import { Libraries, Library, librarySchema } from 'data/library';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { WEB } from 'data/web';
import { getIsStaleAccessToken } from 'ui/utils';
import { useFirestore } from 'ui/hooks';
import { useGooglePhotos } from 'web/hooks';

type Tokens = { accessToken: string; refreshToken: string };

interface LibrariesValue {
  addLibrary: (tokens: Tokens) => Promise<void>;
  getLibraries: () => Promise<void>;
  isLoading: boolean;
  libraries: Libraries;
  refreshLibrary: (libraryId: string) => Promise<void>;
}

const LibrariesContext = createContext<LibrariesValue>({
  addLibrary: async () => {},
  getLibraries: async () => {},
  isLoading: true,
  libraries: [],
  refreshLibrary: async () => {},
});

const MEDIA_ITEMS_TTL_MS = 1000 * 60 * 60; // 1 Hour

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
  const { isLoading: isFirestoreLoading, addDocs, getDocTuple, getDocTuples, updateDocs } = useFirestore();
  const [isLoading, setIsLoading] = useState<LibrariesValue['isLoading']>(true);
  const [libraries, setLibraries] = useState<LibrariesValue['libraries']>([]);
  const getLibraries = useCallback(async () => {
    if (userId) {
      getDocTuples(WEB.FIRESTORE.COLLECTIONS.LIBRARIES(userId))
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
        getDocTuple(WEB.FIRESTORE.COLLECTIONS.LIBRARY(userId, libraryId))
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

      await addDocs(WEB.FIRESTORE.COLLECTIONS.LIBRARIES(userId), [library]);
    },
    [addDocs, userId]
  );
  const updateLibrary = useCallback(
    async (libraryId: string, updates: Partial<Library>) => {
      const libraryPath = WEB.FIRESTORE.COLLECTIONS.LIBRARY(userId, libraryId);

      await updateDocs([[libraryPath, updates]]);
    },
    [updateDocs, userId]
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
        const { accessToken, mediaItems } = await getFirstPage({
          accessToken: isStaleAccessToken ? undefined : library.accessToken,
          refreshToken: library.refreshToken,
        });

        updateKeysRef.current.add(libraryId);

        await updateLibrary(libraryId, { ...library, accessToken, mediaItems, updated: new Date() });

        shouldRefreshRecords && refreshRecords();
      }
    },
    [getFirstPage, libraries, refreshRecords, updateLibrary]
  );

  useEffect(() => {
    const staleLibraries = libraries.filter(
      ([key, library]) =>
        !updateKeysRef.current.has(key) &&
        (!library.mediaItems || library.updated.getTime() < Date.now() - MEDIA_ITEMS_TTL_MS)
    );

    Promise.all(staleLibraries.map(async ([key]) => refreshLibrary(key, false))).then(() => {
      refreshRecords();
    });
  }, [libraries, refreshLibrary, refreshRecords]);

  useEffect(() => {
    if (!isFirestoreLoading) {
      refreshRecords();
    }
  }, [isFirestoreLoading, refreshRecords]);

  return (
    <LibrariesContext.Provider value={{ addLibrary, getLibraries, isLoading, libraries, refreshLibrary }}>
      {children}
    </LibrariesContext.Provider>
  );
}
