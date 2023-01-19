import { LibraryImport, LibraryTaskStatus, libraryImportSchema } from 'data/library';
import { useEffect, useMemo, useState } from 'react';
import { useFunctions, useRtdb } from 'ui/hooks';

import { FIREBASE } from 'data/firebase';
import { useAuth } from 'ui/contexts';

export type UseLibraryImportResult = ReturnType<typeof useLibraryImport>;

export function useLibraryImport(libraryId: string) {
  const { userId } = useAuth();
  const { listen } = useRtdb();
  const { setLibraryImportStatus } = useFunctions();
  const [libraryImport, setLibraryImport] = useState<LibraryImport | null | undefined>();
  const { start, pause, cancel, destroy } = useMemo(() => {
    function createSender(status: LibraryTaskStatus) {
      return async () => setLibraryImportStatus({ libraryId, status });
    }

    return {
      start: createSender(LibraryTaskStatus.running),
      pause: createSender(LibraryTaskStatus.paused),
      cancel: createSender(LibraryTaskStatus.canceled),
      destroy: createSender(LibraryTaskStatus.destroyed),
    };
  }, [libraryId, setLibraryImportStatus]);
  const isLoading = typeof libraryImport === 'undefined';

  useEffect(() => {
    if (!userId) return;

    const path = FIREBASE.DATABASE.PATHS.LIBRARY_IMPORT(userId, libraryId);

    return listen(path, (snapshot) => {
      const parsed = libraryImportSchema.safeParse(snapshot.val());

      if (parsed.success) {
        setLibraryImport(parsed.data);
      } else {
        setLibraryImport(null);
      }
    });
  }, [libraryId, listen, userId]);

  return { isLoading, libraryImport, actions: { start, pause, cancel, destroy } };
}
