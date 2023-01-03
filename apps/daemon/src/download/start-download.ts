import { DaemonMessage, MessageType, SendMessage, getStateFlags } from 'data/daemon';

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
  const downloadState = getDownloadState();
  const { isRunning } = getStateFlags(downloadState);

  if (isRunning) {
    try {
      if (downloadState.state === 'ingesting' || downloadState.state === 'indexing') {
        const indexingComplete = await indexFilesystem({ db, sendMessage });

        if (indexingComplete) {
          updateDownloadState({ state: 'downloading', text: 'Local file index complete' });
        }
      }

      await Promise.all(
        getDownloadState()
          .folders.sort((a, b) => (a.folder > b.folder ? 1 : -1))
          .map((f) => downloadFolder({ db, folder: f.folder, message, sendMessage }))
      );

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

  updateDownloadState({
    state: 'downloading',
    text: `Downloading ${mediaItemIds.length} new media items to ${folder}`,
  });

  throw new Error('Do not process files yet');

  await Promise.all(
    batchMediaItemIds(mediaItemIds)
      .slice(0, 1)
      .map((mediaItemIds) => downloadMediaItems({ folder, mediaItemIds, db, sendMessage }))
  );
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
