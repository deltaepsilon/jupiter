import {
  CORRUPTED_FOLDER,
  DaemonMessage,
  DownloadState,
  FolderSummary,
  MessageType,
  SendMessage,
  downloadMessageDataSchema,
  getStateFlags,
  updateFolder,
} from 'data/daemon';
import { createAndEmptyFolder, createGettersAndSetters, getDownloadDirectory } from '../utils';

import { FilesystemDatabase } from '../db';
import { downloadMediaItems } from './download-media-items';
import { indexFilesystem } from './index-filesystem';
import { wait } from 'ui/utils/wait';

const BATCH_SIZE = 50;
const IGNORED_FOLDERS = new Set([CORRUPTED_FOLDER]);

interface Args {
  db: FilesystemDatabase;
  message: DaemonMessage;
  sendMessage: SendMessage;
}

export async function startDownload({ db, message, sendMessage }: Args) {
  const { clearDownloadingIds, getDownloadState, updateDownloadState } = createGettersAndSetters(db);
  const { downloadDirectory } = getDownloadDirectory(db);
  let downloadState = getDownloadState();
  const { isRunning } = getStateFlags(downloadState);

  if (isRunning) {
    try {
      if (downloadState.state === 'ingesting' || downloadState.state === 'indexing') {
        const indexingComplete = await indexFilesystem({ db, sendMessage });

        if (indexingComplete) {
          updateDownloadState({ state: 'downloading', text: 'Local file index complete' });
        }
      }

      await createAndEmptyFolder(downloadDirectory);
      clearDownloadingIds();
      downloadState = updateDownloadState({ text: '' });
      sendDownloadStateMessage({ db, downloadState, sendMessage });

      let stateFlags = getStateFlags(downloadState);
      let counter = 0;

      while (!stateFlags.allFoldersComplete && stateFlags.isRunning) {
        const folderSummaries = downloadState.folderSummaries
          .filter((f) => !IGNORED_FOLDERS.has(f.folder))
          .sort((a, b) => (a.folder > b.folder ? 1 : -1));

        counter++;

        if (counter > 5) {
          const downloadState = updateDownloadState({
            isPaused: true,
            text: 'Too many retries. Pausing download for now.',
          });

          sendDownloadStateMessage({ db, downloadState, sendMessage });

          break;
        } else {
          await wait(2000);
        }

        let i = folderSummaries.length;
        while (i--) {
          const folderSummary = folderSummaries[i];
          const folderNeedsDownload =
            folderSummary.mediaItemsCount > folderSummary.downloadedCount + folderSummary.corruptedCount;

          if (folderNeedsDownload) {
            downloadState = setFolderState({ db, folder: folderSummary.folder, state: 'idle' });
          } else {
            downloadState = setFolderState({ db, folder: folderSummary.folder, state: 'complete' });
          }
        }

        sendDownloadStateMessage({ db, downloadState, sendMessage });

        let j = folderSummaries.length;
        while (j--) {
          const folderSummary = folderSummaries[j];
          const folderNeedsDownload =
            folderSummary.mediaItemsCount !== folderSummary.downloadedCount + folderSummary.corruptedCount;

          stateFlags = getStateFlags(downloadState);

          if (folderNeedsDownload && stateFlags.isRunning) {
            downloadState = setFolderState({ db, folder: folderSummary.folder, state: 'downloading' });
            sendDownloadStateMessage({ db, downloadState, sendMessage });

            await downloadFolder({ db, folder: folderSummary.folder, message, sendMessage });
          }

          downloadState = setFolderState({ db, folder: folderSummary.folder, state: 'complete' });
          sendDownloadStateMessage({ db, downloadState, sendMessage });
        }

        downloadState = getDownloadState();
        stateFlags = getStateFlags(downloadState);
      }

      if (stateFlags.allFoldersComplete) {
        downloadState = updateDownloadState({ state: 'complete', text: 'Media item download complete' });
        sendDownloadStateMessage({ db, downloadState, sendMessage });
      }
    } catch (error) {
      console.error(error);
      updateDownloadState({ isPaused: true, text: 'Pausing due to error' });

      if (typeof error === 'string') {
        sendMessage({ type: MessageType.download, payload: { error }, uuid: message.uuid });
      } else if (error instanceof Error) {
        let errorText = error.toString();

        if (errorText.includes('ENOENT')) {
          const matches = errorText.match(/'.+'/);
          errorText = `File not found: ${matches?.[0] || errorText}`;
        }

        sendMessage({ type: MessageType.download, payload: { error: errorText }, uuid: message.uuid });
      } else {
        console.error(error);
      }
    }
  }
}

async function downloadFolder({ db, folder, sendMessage }: Args & { folder: string }) {
  const { getIngestedIds, getDownloadedIds, getDownloadingIds, updateDownloadState } = createGettersAndSetters(db);
  const ingestedIds = getIngestedIds(folder);
  const downloadedIds = getDownloadedIds(folder);
  const downloadingIds = getDownloadingIds(folder);
  const mediaItemIds = [...ingestedIds].filter((id) => !downloadedIds.has(id) && !downloadingIds.has(id));
  const text = `Downloading ${mediaItemIds.length} new media items to ${folder}`;

  if (mediaItemIds.length) {
    updateDownloadState({ state: 'downloading', text });

    sendMessage({ type: MessageType.download, payload: { text } });

    await Promise.all(
      batchMediaItemIds(mediaItemIds).map((mediaItemIds) =>
        downloadMediaItems({ folder, mediaItemIds, db, sendMessage })
      )
    );
  }
}

function setFolderState({
  db,
  folder,
  state,
}: {
  db: FilesystemDatabase;
  folder: FolderSummary['folder'];
  state: FolderSummary['state'];
}) {
  const { getDownloadState, setDownloadState } = createGettersAndSetters(db);
  const downloadState = updateFolder({ folder, downloadState: getDownloadState() }, (folderSummary: FolderSummary) => {
    folderSummary.state = state;

    return folderSummary;
  });

  setDownloadState(downloadState);

  return downloadState;
}

function sendDownloadStateMessage({
  db,
  downloadState,
  sendMessage,
}: {
  db: FilesystemDatabase;
  downloadState?: DownloadState;
  sendMessage: SendMessage;
}) {
  const { getDownloadState } = createGettersAndSetters(db);
  const state = downloadState ?? getDownloadState();

  sendMessage({
    type: MessageType.download,
    payload: {
      data: downloadMessageDataSchema.parse({ libraryId: db.libraryId, state }),
      text: state.text,
    },
  });
}

function batchMediaItemIds(mediaItemIds: string[]) {
  return mediaItemIds.reduce((acc, id, index) => {
    const batchIndex = Math.floor(index / BATCH_SIZE);

    if (!acc[batchIndex]) {
      acc[batchIndex] = [];
    }

    acc[batchIndex].push(id);

    return acc;
  }, [] as string[][]);
}
