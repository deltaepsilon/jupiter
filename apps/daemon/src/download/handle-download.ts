import {
  DEFAULT_DOWNLOAD_STATE,
  DaemonMessage,
  DownloadAction,
  MessageType,
  SendMessage,
  daemonMessage,
  downloadMessageDataSchema,
  getIsRunning,
  updateFolder,
} from 'data/daemon';
import { createGettersAndSetters, getFolderFromDate } from '../utils';

import { FilesystemDatabase } from 'daemon/src/db';
import { startDownload } from './start-download';

export async function handleDownload({
  db,
  message,
  sendMessage,
}: {
  db: FilesystemDatabase;
  message: DaemonMessage;
  sendMessage: SendMessage;
}) {
  const uuid = message.uuid;
  const { libraryId, tokens, urls } = downloadMessageDataSchema.parse(message.payload.data);
  const response = daemonMessage.parse({
    type: MessageType.download,
    payload: { action: message.payload.action },
    uuid,
  });
  const { getDownloadState, setTokens, setUrls } = createGettersAndSetters(db);
  const downloadState = getDownloadState();
  const isRunning = getIsRunning(downloadState);

  switch (message.payload.action) {
    case DownloadAction.init:
      if (!urls) {
        throw new Error('No URLs provided');
      } else {
        tokens && setTokens(tokens);
        setUrls(urls);
      }

      isRunning && startDownload({ db, message, sendMessage });

      break;

    case DownloadAction.start:
      start({
        db,
        response,
      });

      startDownload({ db, message, sendMessage });
      break;

    case DownloadAction.pause:
      pause({ db });

      break;

    case DownloadAction.cancel:
      break;

    case DownloadAction.destroy:
      destroy({ db });
      response.payload.text = 'Download destroyed.';

      break;

    case DownloadAction.addMediaItem: {
      addMediaItem({ db, message, response });
      break;
    }

    default:
      break;
  }

  response.payload.data = downloadMessageDataSchema.parse({ libraryId, state: getDownloadState() });

  return sendMessage(response);
}

function start({ db, response }: { db: FilesystemDatabase; response: DaemonMessage }) {
  const { getDownloadState, getIngestedIds, getTokens, setDownloadedIds, setTokens, updateDownloadState } =
    createGettersAndSetters(db);
  const downloadState = getDownloadState();
  const tokens = getTokens();

  if (downloadState.state === 'idle') {
    response.payload.text = 'Starting download...';
    updateDownloadState({
      isPaused: false,
      state: 'ingesting',
      text: 'Transferring media items to daemon',
    });
  } else if (downloadState.state === 'complete') {
    response.payload.text = 'Restarting download...';
    updateDownloadState({
      folderSummaries: downloadState.folderSummaries.map((folderSummary) => {
        const folderName = folderSummary.folder;

        setDownloadedIds(folderName, new Set([]));

        return {
          ...folderSummary,
          state: 'downloading',
          downloadedCount: 0,
          mediaItemsCount: getIngestedIds(folderName).size,
        };
      }),
      isPaused: false,
      state: 'ingesting',
      text: 'Downloading media items',
    });
  } else {
    response.payload.text = 'Resuming download...';

    updateDownloadState({ isPaused: false, text: 'Resuming download...' });
  }

  tokens && setTokens(tokens);
}

function pause({ db }: { db: FilesystemDatabase }) {
  const { updateDownloadState } = createGettersAndSetters(db);

  updateDownloadState({
    isPaused: true,
    text: 'Paused',
  });
}

function destroy({ db }: { db: FilesystemDatabase }) {
  const {
    clearDownloadingIds,
    setRelativeFilePaths,
    removeMediaItems,
    resetFileIndices,
    setIngestedIds,
    setDownloadState,
    setDownloadedIds,
    getDownloadState,
  } = createGettersAndSetters(db);
  const downloadState = getDownloadState();

  downloadState.folderSummaries.forEach(({ folder }) => {
    removeMediaItems(folder);
    resetFileIndices(folder);
    setIngestedIds(folder, new Set([]));
    setRelativeFilePaths(folder, new Set());
    setDownloadedIds(folder, new Set([]));
  });

  clearDownloadingIds();

  setDownloadState(DEFAULT_DOWNLOAD_STATE);
}

function addMediaItem({
  db,
  message,
  response,
}: {
  db: FilesystemDatabase;
  message: DaemonMessage;
  response: DaemonMessage;
}) {
  const { getIngestedIds, getDownloadState, setIngestedIds, setMediaItem, setDownloadState } =
    createGettersAndSetters(db);
  const downloadState = getDownloadState();
  const mediaItem = message.payload.data.mediaItem;
  const folder = getFolderFromDate(mediaItem.mediaMetadata.creationTime);

  if (!mediaItem) {
    response.payload.error = 'No media item provided';
  } else {
    const ingestedIds = getIngestedIds(folder);
    ingestedIds.add(mediaItem.id);

    const updatedDownloadState = updateFolder({ folder, downloadState }, (folderSummary) => {
      folderSummary.mediaItemsCount = ingestedIds.size;
      folderSummary.updated = new Date();

      return folderSummary;
    });

    setIngestedIds(folder, ingestedIds);
    setMediaItem(folder, mediaItem);
    setDownloadState({ ...updatedDownloadState, lastKey: mediaItem.key });
  }
}
