import { DownloadAction, DownloadData, DownloadState, MessageType, downloadDataSchema } from 'data/daemon';
import { Library, LibraryDownload, libraryDownloadSchema } from 'data/library';
import { limitToFirst, onChildAdded, orderByKey, query, ref, startAfter, startAt } from 'firebase/database';
import { useEffect, useMemo, useState } from 'react';

import { FIREBASE } from 'data/firebase';
import { MediaItem } from 'data/media-items';
import { createQueue } from 'ui/utils';
import { useAuth } from 'ui/contexts';
import { useDaemon } from '../contexts';
import { useRtdb } from 'ui/hooks';

export type UseLibraryDownloadResult = ReturnType<typeof useLibraryDownload>;

export function useLibraryDownload(libraryId: string, library: Library) {
  const { user } = useAuth();
  const { isConnected, send } = useDaemon();
  const [state, setState] = useState<DownloadState>();
  const { database } = useRtdb();
  const { init, start, pause, cancel, destroy, addMediaItem } = useMemo(() => {
    function createSender(action: DownloadAction) {
      return ({ mediaItem }: { mediaItem?: MediaItem } = {}) => {
        let urls: DownloadData['urls'];

        if (action === DownloadAction.addMediaItem && !mediaItem) {
          throw new Error('mediaItem is required for addMediaItem action');
        }

        if (action === DownloadAction.init) {
          urls = {
            refreshAccessToken: FIREBASE.FUNCTIONS.REFRESH_ACCESS_TOKEN,
            batchGetMediaItems: FIREBASE.FUNCTIONS.BATCH_GET_MEDIA_ITEMS,
          };
        }

        return send({
          type: MessageType.download,
          payload: {
            action,
            data: downloadDataSchema.parse({
              libraryId,
              tokens: { refreshToken: library.refreshToken },
              mediaItem,
              urls,
            }),
          },
        }).then((result) => {
          const { state } = downloadDataSchema.parse(result.payload.data);

          setState(state);
        });
      };
    }

    return {
      init: createSender(DownloadAction.init),
      start: createSender(DownloadAction.start),
      pause: createSender(DownloadAction.pause),
      cancel: createSender(DownloadAction.cancel),
      destroy: createSender(DownloadAction.destroy),
      addMediaItem: createSender(DownloadAction.addMediaItem),
    };
  }, [library.refreshToken, libraryId, send]);
  const isLoading = typeof state === 'undefined';
  const userId = user?.uid;
  const shouldIngest =
    isConnected && state && !state?.isIngestComplete && state.isRunning && !!database && !!userId && !!libraryId;

  useEffect(() => {
    user && isConnected && init();
  }, [init, isConnected, user]);

  useEffect(() => {
    if (shouldIngest) {
      const lastKey = state?.lastKey;
      const mediaItemsRef = ref(database, FIREBASE.DATABASE.PATHS.LIBRARY_MEDIA_ITEMS(userId, libraryId));
      const mediaItemsQuery = lastKey
        ? query(mediaItemsRef, orderByKey(), startAfter(lastKey))
        : query(mediaItemsRef, orderByKey());
      const queuedAddMediaItem = createQueue(addMediaItem, 100);

      const unsubscribe = onChildAdded(mediaItemsQuery, (snapshot) =>
        queuedAddMediaItem({ mediaItem: { key: snapshot.key, ...snapshot.val() } })
      );

      return () => unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldIngest]);

  return {
    isLoading,
    actions: { start, pause, cancel, destroy },
    state,
  };
}
