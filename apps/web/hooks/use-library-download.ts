import { LibraryDownload, libraryDownloadSchema } from 'data/library';
import { MessageAction, encodePostMessage } from 'data/service-worker';
import { useEffect, useMemo, useState } from 'react';

import { WEB } from 'data/web';
import { useAuth } from 'ui/contexts';
import { useRtdb } from 'ui/hooks';
import { useServiceWorker } from 'web/contexts/service-worker-context';

export type UseLibraryDownloadResult = ReturnType<typeof useLibraryDownload>;

export function useLibraryDownload(libraryId: string) {
  const { user } = useAuth();
  const { listen } = useRtdb();
  const [libraryDownload, setLibraryDownload] = useState<LibraryDownload | null | undefined>();
  const { sendMessage } = useServiceWorker();
  const { init, start, pause, cancel, destroy } = useMemo(() => {
    function createSender(action: MessageAction) {
      return () => sendMessage(encodePostMessage({ action, data: { libraryId } }));
    }

    return {
      init: createSender(MessageAction.libraryDownloadInit),
      start: createSender(MessageAction.libraryDownloadStart),
      pause: createSender(MessageAction.libraryDownloadPause),
      cancel: createSender(MessageAction.libraryDownloadCancel),
      destroy: createSender(MessageAction.libraryDownloadDestroy),
    };
  }, [libraryId, sendMessage]);
  const isLoading = typeof libraryDownload === 'undefined';

  useEffect(() => {
    if (!user) return;

    const path = WEB.DATABASE.PATHS.LIBRARY_DOWNLOAD(user.uid, libraryId);

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

  return { isLoading, libraryDownload, actions: { start, pause, cancel, destroy } };
}
