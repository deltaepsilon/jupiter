import {
  DEFAULT_DOWNLOAD_STATE,
  DaemonMessage,
  DownloadAction,
  MessageType,
  SendMessage,
  daemonMessage,
  downloadDataSchema,
  getIsRunning,
  updateFolder,
} from 'data/daemon';
import { createGettersAndSetters, getFolderFromDate } from '../utils';

import { FilesystemDatabase } from 'daemon/src/db';
import { startDownload } from './start-download';

export async function download({
  db,
  message,
  sendMessage,
}: {
  db: FilesystemDatabase;
  message: DaemonMessage;
  sendMessage: SendMessage;
}) {
  const uuid = message.uuid;
  const { folder, libraryId, tokens, urls } = downloadDataSchema.parse(message.payload.data);
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

  response.payload.data = downloadDataSchema.parse({ libraryId, state: getDownloadState() });

  return sendMessage(response);
}

function start({ db, response }: { db: FilesystemDatabase; response: DaemonMessage }) {
  const { updateDownloadState, setTokens, getDownloadState, getTokens } = createGettersAndSetters(db);
  const downloadState = getDownloadState();
  const tokens = getTokens();

  response.payload.text = 'Starting download...';

  if (downloadState.state === 'idle') {
    updateDownloadState({
      isPaused: false,
      state: 'ingesting',
      text: 'Transferring media items to daemon',
    });
  } else {
    updateDownloadState({ isPaused: false, text: 'Resuming download...' });
  }

  tokens && setTokens(tokens);
}

function pause({ db }: { db: FilesystemDatabase }) {
  const { updateDownloadState } = createGettersAndSetters(db);

  console.log('Pausing download...');

  updateDownloadState({
    isPaused: true,
    text: 'Paused',
  });
}

function destroy({ db }: { db: FilesystemDatabase }) {
  const { removeMediaItems, resetFileIndices, setIngestedIds, setDownloadState, setDownloadedIds, getDownloadState } =
    createGettersAndSetters(db);
  const downloadState = getDownloadState();

  downloadState.folders.forEach(({ folder }) => {
    removeMediaItems(folder);
    resetFileIndices(folder);
    setIngestedIds(folder, new Set([]));
    setDownloadedIds(folder, new Set([]));
  });

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
    const updatedDownloadState = updateFolder({ folder, downloadState }, (folder) => {
      folder.mediaItemsCount++;
      folder.updated = new Date();

      return folder;
    });

    ingestedIds.add(mediaItem.id);

    setIngestedIds(folder, ingestedIds);
    setMediaItem(folder, mediaItem);
    setDownloadState({ ...updatedDownloadState, lastKey: mediaItem.key });
  }
}
