import {
  DEFAULT_DOWNLOAD_STATE,
  DownloadAction,
  DownloadMessageData,
  DownloadState,
  MessageType,
  downloadMessageDataSchema,
  getShouldIngest,
  invalidateMediaItemsMessageDataSchema,
} from 'data/daemon';
import { increment, onChildAdded, orderByKey, query, ref, startAfter, update } from 'firebase/database';
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
  const { init, start, pause, cancel, destroy, addMediaItem, restartIngest } = useMemo(() => {
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
      restartIngest: createSender(DownloadAction.restartIngest),
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
      handler: async (message) => {
        const isInvalidateMediaItemsMessage =
          message.payload?.data && message.payload?.action === DownloadAction.invalidateMediaItems;

        if (isInvalidateMediaItemsMessage && database && userId) {
          const { invalidMediaKeys } = invalidateMediaItemsMessageDataSchema.parse(message.payload.data);
          const mediaItemsRef = ref(database, FIREBASE.DATABASE.PATHS.LIBRARY_MEDIA_ITEMS(userId, libraryId));
          const importRef = ref(database, FIREBASE.DATABASE.PATHS.LIBRARY_IMPORT(userId, libraryId));
          const mediaItemsUpdates = invalidMediaKeys.reduce<Record<string, null>>((acc, key) => {
            acc[key] = null;

            return acc;
          }, {});
          const importUpdates = { count: increment(-invalidMediaKeys.length) };

          await update(mediaItemsRef, mediaItemsUpdates);
          await update(importRef, importUpdates);
        } else {
          const parsed = downloadMessageDataSchema.safeParse(message.payload.data);

          if (parsed.success) {
            setDownloadState(parsed.data.state);
          }
        }
      },
    });
  }, [database, libraryId, registerHandler, userId]);

  useEffect(() => {
    if (shouldIngest) {
      const lastKey = downloadState?.lastKey;
      const mediaItemsRef = ref(database, FIREBASE.DATABASE.PATHS.LIBRARY_MEDIA_ITEMS(userId, libraryId));
      const mediaItemsQuery = lastKey
        ? query(mediaItemsRef, orderByKey(), startAfter(lastKey))
        : query(mediaItemsRef, orderByKey());
      const { add: addToQueue } = createQueue(addMediaItem, 0);

      const unsubscribe = onChildAdded(mediaItemsQuery, (snapshot) =>
        addToQueue({ mediaItem: { key: snapshot.key, ...snapshot.val() } })
      );

      return () => {
        addToQueue.empty();
        unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldIngest]);

  return {
    isLoading,
    actions: { start, pause, cancel, destroy, restartIngest },
    downloadState,
  };
}
