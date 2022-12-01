import { LibraryImport, libraryImportSchema } from 'data/library';
import { MessageAction, encodePostMessage } from 'data/service-worker';
import { useEffect, useMemo, useState } from 'react';

import { WEB } from 'data/web';
import { useAuth } from 'ui/contexts';
import { useRtdb } from 'ui/hooks';
import { useServiceWorker } from 'web/contexts/service-worker-context';

export type UseLibraryImportResult = ReturnType<typeof useLibraryImport>;

export function useLibraryImport(libraryId: string) {
  const { user } = useAuth();
  const { listen } = useRtdb();
  const [libraryImport, setLibraryImport] = useState<LibraryImport | null | undefined>();
  const { sendMessage } = useServiceWorker();
  const { init, start, pause, cancel, destroy } = useMemo(() => {
    function createSender(action: MessageAction) {
      return () => sendMessage(encodePostMessage({ action, data: { libraryId } }));
    }

    return {
      init: createSender(MessageAction.libraryImportInit),
      start: createSender(MessageAction.libraryImportStart),
      pause: createSender(MessageAction.libraryImportPause),
      cancel: createSender(MessageAction.libraryImportCancel),
      destroy: createSender(MessageAction.libraryImportDestroy),
    };
  }, [libraryId, sendMessage]);
  const isLoading = typeof libraryImport === 'undefined';

  useEffect(() => {
    if (!user) return;

    const path = WEB.DATABASE.PATHS.LIBRARY_IMPORT(user.uid, libraryId);

    return listen(path, (snapshot) => {
      const parsed = libraryImportSchema.safeParse(snapshot.val());

      if (parsed.success) {
        setLibraryImport(parsed.data);
      } else {
        setLibraryImport(null);
      }
    });
  }, [init, libraryId, listen, user]);

  useEffect(() => {
    user && init();
  }, [init, user]);

  return { isLoading, libraryImport, actions: { start, pause, cancel, destroy } };
}
