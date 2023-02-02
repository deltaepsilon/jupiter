import {
  DEFAULT_DOWNLOAD_STATE,
  DownloadAction,
  DownloadMessageData,
  DownloadState,
  MessageType,
  downloadMessageDataSchema,
  getShouldIngest,
} from 'data/daemon';
import { onChildAdded, orderByKey, query, ref, startAfter } from 'firebase/database';
import { useEffect, useMemo, useState } from 'react';

import { FIREBASE } from 'data/firebase';
import { Library } from 'data/library';
import { MediaItem } from 'data/media-items';
import { createQueue } from 'ui/utils';
import { useAuth } from 'ui/contexts';
import { useDaemon } from '../contexts';
import { useRtdb } from 'ui/hooks';

export type UseLibraryDownloadResult = ReturnType<typeof useLibraryDownload>;

export function useLibraryDownload(libraryId: string, library: Library) {
  const { userId } = useAuth();
  const { isDbReady, registerHandler, send } = useDaemon();
  const [downloadState, setDownloadState] = useState<DownloadState>(DEFAULT_DOWNLOAD_STATE);
  const { database } = useRtdb();
  const { init, start, pause, cancel, destroy, addMediaItem } = useMemo(() => {
    function createSender(action: DownloadAction) {
      return ({ mediaItem }: { mediaItem?: MediaItem } = {}) => {
        let urls: DownloadMessageData['urls'];

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
            data: downloadMessageDataSchema.parse({
              libraryId,
              tokens: { refreshToken: library.refreshToken },
              mediaItem,
              urls,
            }),
          },
        }).then((result) => {
          const { state } = downloadMessageDataSchema.parse(result.payload.data);

          setDownloadState(state);
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
  const isLoading = typeof downloadState === 'undefined';
  const shouldIngest =
    isDbReady && downloadState && getShouldIngest(downloadState) && !!database && !!userId && !!libraryId;

  useEffect(() => {
    userId && isDbReady && init();
  }, [init, isDbReady, userId]);

  useEffect(() => {
    return registerHandler({
      type: MessageType.download,
      handler: (message) => {
        if (message.payload?.data) {
          const { state } = downloadMessageDataSchema.parse(message.payload.data);

          setDownloadState(state);
        }
      },
    });
  }, [registerHandler]);

  useEffect(() => {
    if (shouldIngest) {
      const lastKey = downloadState?.lastKey;
      const mediaItemsRef = ref(database, FIREBASE.DATABASE.PATHS.LIBRARY_MEDIA_ITEMS(userId, libraryId));
      const mediaItemsQuery = lastKey
        ? query(mediaItemsRef, orderByKey(), startAfter(lastKey))
        : query(mediaItemsRef, orderByKey());
      const queuedAddMediaItem = createQueue(addMediaItem, 0);

      const unsubscribe = onChildAdded(mediaItemsQuery, (snapshot) =>
        queuedAddMediaItem({ mediaItem: { key: snapshot.key, ...snapshot.val() } })
      );

      return () => {
        queuedAddMediaItem.empty();
        unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldIngest]);

  return {
    isLoading,
    actions: { start, pause, cancel, destroy },
    downloadState,
  };
}
