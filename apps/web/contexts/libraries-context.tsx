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
}

const LibrariesContext = createContext<LibrariesValue>({
  addLibrary: async () => {},
  getLibraries: async () => {},
  isLoading: true,
  libraries: [],
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

  useEffect(() => {
    const staleLibraries = libraries.filter(
      ([key, library]) =>
        !updateKeysRef.current.has(key) &&
        (!library.mediaItems || library.updated.getTime() < Date.now() - MEDIA_ITEMS_TTL_MS)
    );

    Promise.all(
      staleLibraries.map(async ([key, library]) => {
        const isStaleAccessToken = getIsStaleAccessToken(library.updated);
        const { accessToken, mediaItems } = await getFirstPage({
          accessToken: isStaleAccessToken ? undefined : library.accessToken,
          refreshToken: library.refreshToken,
        });

        updateKeysRef.current.add(key);

        await updateLibrary(key, { ...library, accessToken, mediaItems, updated: new Date() });
      })
    );
  }, [getFirstPage, libraries, updateLibrary]);

  useEffect(() => {
    if (!isFirestoreLoading) {
      libraryId ? getLibrary(libraryId) : getLibraries();
    }
  }, [getLibraries, getLibrary, libraryId, isFirestoreLoading]);

  return (
    <LibrariesContext.Provider value={{ addLibrary, getLibraries, isLoading, libraries }}>
      {children}
    </LibrariesContext.Provider>
  );
}
