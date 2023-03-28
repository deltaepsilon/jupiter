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

import { LevelDatabase } from 'daemon/src/level';
import { startDownload } from './start-download';

export async function handleDownload({
  db,
  message,
  sendMessage,
}: {
  db: LevelDatabase;
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
  const downloadState = await getDownloadState();
  const isRunning = getIsRunning(downloadState);

  async function setTokensAndUrls() {
    tokens && (await setTokens(tokens));
    urls && (await setUrls(urls));
  }

  switch (message.payload.action) {
    case DownloadAction.init:
      if (!urls) {
        throw new Error('No URLs provided');
      } else {
        await setTokensAndUrls();
      }

      isRunning && (await startDownload({ db, message, sendMessage }));

      break;

    case DownloadAction.start:
      await setTokensAndUrls();
      await start({ db, response });
      await startDownload({ db, message, sendMessage });
      break;

    case DownloadAction.pause:
      await pause({ db });

      break;

    case DownloadAction.cancel:
      break;

    case DownloadAction.destroy:
      await destroy({ db });
      response.payload.text = 'Download destroyed.';

      break;

    case DownloadAction.addMediaItem: {
      await addMediaItem({ db, message, response });
      break;
    }

    case DownloadAction.restartIngest: {
      await restartIngest({ db, sendMessage });

      await startDownload({ db, message, sendMessage });
      break;
    }

    default:
      break;
  }

  response.payload.data = downloadMessageDataSchema.parse({ libraryId, state: await getDownloadState() });

  return sendMessage(response);
}

async function start({ db, response }: { db: LevelDatabase; response: DaemonMessage }) {
  const { getDownloadState, getIngestedIds, getTokens, setDownloadedIds, setTokens, updateDownloadState } =
    createGettersAndSetters(db);
  const downloadState = await getDownloadState();
  const tokens = await getTokens();

  if (downloadState.state === 'idle') {
    response.payload.text = 'Download idle.';
    await updateDownloadState({
      isPaused: false,
      state: 'ingesting',
      text: 'Transferring media items to daemon',
    });
  } else if (downloadState.state === 'complete') {
    response.payload.text = 'Restarting download...';
    await updateDownloadState({
      folderSummaries: await Promise.all(
        downloadState.folderSummaries.map(async (folderSummary) => {
          const folderName = folderSummary.folder;

          await setDownloadedIds(folderName, new Set([]));

          return {
            ...folderSummary,
            state: 'downloading',
            downloadedCount: 0,
            mediaItemsCount: (await getIngestedIds(folderName)).size,
          };
        })
      ),
      isPaused: false,
      state: 'ingesting',
      text: 'Downloading media items',
    });
  } else {
    response.payload.text = 'Resuming download...';

    await updateDownloadState({ isPaused: false, text: 'Resuming download...' });
  }

  tokens && (await setTokens(tokens));
}

async function pause({ db }: { db: LevelDatabase }) {
  const { updateDownloadState } = createGettersAndSetters(db);

  await updateDownloadState({
    isPaused: true,
    text: 'Paused',
  });
}

async function destroy({ db }: { db: LevelDatabase }) {
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
  const downloadState = await getDownloadState();

  await Promise.all(
    downloadState.folderSummaries.map(async ({ folder }) => {
      await removeMediaItems(folder);
      await resetFileIndices(folder);
      await setIngestedIds(folder, new Set([]));
      await setRelativeFilePaths(folder, new Set());
      await setDownloadedIds(folder, new Set([]));
    })
  );

  await clearDownloadingIds();

  await setDownloadState(DEFAULT_DOWNLOAD_STATE);
}

async function addMediaItem({
  db,
  message,
  response,
}: {
  db: LevelDatabase;
  message: DaemonMessage;
  response: DaemonMessage;
}) {
  const { getIngestedIds, getDownloadState, setIngestedIds, setMediaItem, setDownloadState } =
    createGettersAndSetters(db);
  const downloadState = await getDownloadState();
  const mediaItem = message.payload.data.mediaItem;
  const folder = getFolderFromDate(mediaItem.mediaMetadata.creationTime);

  if (!mediaItem) {
    response.payload.error = 'No media item provided';
  } else {
    const ingestedIds = await getIngestedIds(folder);

    ingestedIds.add(mediaItem.id);

    const updatedDownloadState = await updateFolder({ folder, downloadState }, async (folderSummary) => {
      folderSummary.mediaItemsCount = ingestedIds.size;
      folderSummary.updated = new Date();

      return folderSummary;
    });

    await setIngestedIds(folder, ingestedIds);
    await setMediaItem(folder, mediaItem);
    await setDownloadState({ ...updatedDownloadState, lastKey: mediaItem.key });
  }
}

async function restartIngest({ db, sendMessage }: { db: LevelDatabase; sendMessage: SendMessage }) {
  const { updateDownloadState } = createGettersAndSetters(db);
  const state = await updateDownloadState({ lastKey: undefined, isPaused: false, state: 'ingesting' });

  sendMessage({
    type: MessageType.download,
    payload: { data: downloadMessageDataSchema.parse({ libraryId: db.libraryId, state }) },
  });
}
