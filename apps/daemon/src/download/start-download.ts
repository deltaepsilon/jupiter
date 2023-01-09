import {
  DaemonMessage,
  DownloadState,
  Folder,
  MessageType,
  SendMessage,
  downloadDataSchema,
  getStateFlags,
  updateFolder,
} from 'data/daemon';

import { FilesystemDatabase } from '../db';
import { createGettersAndSetters } from '../utils';
import { downloadMediaItems } from './download-media-items';
import { indexFilesystem } from './index-filesystem';

const BATCH_SIZE = 50;

interface Args {
  db: FilesystemDatabase;
  message: DaemonMessage;
  sendMessage: SendMessage;
}

export async function startDownload({ db, message, sendMessage }: Args) {
  const { getDownloadState, updateDownloadState } = createGettersAndSetters(db);
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

      downloadState = getDownloadState();

      while (!getStateFlags(downloadState).isFoldersComplete) {
        const folders = downloadState.folders.sort((a, b) => (a.folder > b.folder ? 1 : -1));

        let i = folders.length;
        while (i--) {
          const folder = folders[i];
          const folderNeedsDownload = folder.mediaItemsCount !== folder.downloadedCount;

          if (folderNeedsDownload) {
            downloadState = setFolderState({ db, folder: folder.folder, sendMessage, state: 'idle' });
          } else {
            downloadState = setFolderState({ db, folder: folder.folder, sendMessage, state: 'complete' });
          }
        }

        sendDownloadStateMessage({ db, downloadState, sendMessage });

        let j = folders.length;
        while (j--) {
          const folder = folders[j];
          const folderNeedsDownload = folder.mediaItemsCount !== folder.downloadedCount;

          if (folderNeedsDownload) {
            downloadState = setFolderState({ db, folder: folder.folder, sendMessage, state: 'downloading' });
            sendDownloadStateMessage({ db, downloadState, sendMessage });

            await downloadFolder({ db, folder: folder.folder, message, sendMessage });

            downloadState = setFolderState({ db, folder: folder.folder, sendMessage, state: 'complete' });
            sendDownloadStateMessage({ db, downloadState, sendMessage });
          }
        }
      }

      updateDownloadState({ state: 'complete', text: 'Media item download complete' });
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

async function downloadFolder({ db, folder, message, sendMessage }: Args & { folder: string }) {
  const { getIngestedIds, getDownloadedIds, updateDownloadState } = createGettersAndSetters(db);
  const mediaItemIds = [...getIngestedIds(folder)].filter((id) => !getDownloadedIds(folder).has(id));
  const text = `Downloading ${mediaItemIds.length} new media items to ${folder}`;

  updateDownloadState({ state: 'downloading', text });

  sendMessage({ type: MessageType.download, payload: { text } });

  await Promise.all(
    batchMediaItemIds(mediaItemIds).map((mediaItemIds) => downloadMediaItems({ folder, mediaItemIds, db, sendMessage }))
  );
}

function setFolderState({
  db,
  folder,
  sendMessage,
  state,
}: {
  db: FilesystemDatabase;
  folder: string;
  sendMessage: SendMessage;
  state: Folder['state'];
}) {
  const { getDownloadState, setDownloadState } = createGettersAndSetters(db);
  const downloadState = updateFolder({ folder, downloadState: getDownloadState() }, (folder: Folder) => {
    folder.state = state;

    return folder;
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

  sendMessage({
    type: MessageType.download,
    payload: {
      data: downloadDataSchema.parse({ libraryId: db.libraryId, state: downloadState ?? getDownloadState() }),
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
