import { Libraries, Library, librarySchema } from 'data/library';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { WEB } from 'data/web';
import { useFirestore } from 'ui/hooks';

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

export function useLibraries() {
  return useContext(LibrariesContext);
}

interface Props {
  children: React.ReactNode;
  userId: string;
}

export function LibrariesProvider({ children, userId }: Props) {
  const { addDocs, getDocTuples } = useFirestore();
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
  const addLibrary = useCallback(
    async (tokens: Tokens) => {
      const library = librarySchema.parse(tokens);

      await addDocs(WEB.FIRESTORE.COLLECTIONS.LIBRARIES(userId), [library]);
    },
    [addDocs, userId]
  );

  useEffect(() => {
    getLibraries();
  }, [getLibraries]);

  return (
    <LibrariesContext.Provider value={{ addLibrary, getLibraries, isLoading, libraries }}>
      {children}
    </LibrariesContext.Provider>
  );
}
