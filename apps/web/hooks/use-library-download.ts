import { LibraryDownload, libraryDownloadSchema } from 'data/library';
import { useEffect, useMemo, useState } from 'react';

import { FIREBASE } from 'data/firebase';
import { useAuth } from 'ui/contexts';
import { useRtdb } from 'ui/hooks';

export type UseLibraryDownloadResult = ReturnType<typeof useLibraryDownload>;

export function useLibraryDownload(libraryId: string) {
  const { user } = useAuth();
  const { listen } = useRtdb();
  const [libraryDownload, setLibraryDownload] = useState<LibraryDownload | null | undefined>();
  const { init, start, pause, cancel, destroy } = useMemo(() => {
    function createSender() {
      return () => {
        console.log({ data: { libraryId } });
      };
    }

    return {
      init: createSender(),
      start: createSender(),
      pause: createSender(),
      cancel: createSender(),
      destroy: createSender(),
    };
  }, [libraryId]);
  const isLoading = typeof libraryDownload === 'undefined';

  useEffect(() => {
    if (!user) return;

    const path = FIREBASE.DATABASE.PATHS.LIBRARY_DOWNLOAD(user.uid, libraryId);

    return listen(path, (snapshot) => {
      const parsed = libraryDownloadSchema.safeParse(snapshot.val());

      if (parsed.success) {
        setLibraryDownload(parsed.data);
      } else {
        setLibraryDownload(null);
      }
    });
  }, [init, libraryId, listen, user]);

  useEffect(() => {
    user && init();
  }, [init, user]);

  return {
    isLoading,
    libraryDownload,
    actions: { start, pause, cancel, destroy },
  };
}
