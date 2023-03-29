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

import { LevelDatabase } from '../level';
import { downloadMediaItems } from './download-media-items';
import { indexFilesystem } from './index-filesystem';
import { wait } from 'ui/utils/wait';

const BATCH_SIZE = 50;
const IGNORED_FOLDERS = new Set([CORRUPTED_FOLDER]);

interface Args {
  db: LevelDatabase;
  message: DaemonMessage;
  sendMessage: SendMessage;
}

export async function startDownload({ db, message, sendMessage }: Args) {
  const { clearDownloadingIds, getDownloadState, updateDownloadState } = createGettersAndSetters(db);
  const { downloadDirectory } = await getDownloadDirectory(db);
  let downloadState = await getDownloadState();
  const { isRunning } = getStateFlags(downloadState);

  console.info(`[startDownload] isRunning: ${isRunning}`);

  if (isRunning) {
    try {
      if (downloadState.state === 'ingesting' || downloadState.state === 'indexing') {
        console.info(`[indexFilesystem] started`);
        console.time('indexFilesystem');
        const indexingComplete = await indexFilesystem({ db, sendMessage });
        console.timeEnd('indexFilesystem');

        if (indexingComplete) {
          await updateDownloadState({ state: 'downloading', text: 'Local file index complete' });
        }
      }

      console.info('creating download directory');
      await createAndEmptyFolder(downloadDirectory);
      await clearDownloadingIds();

      downloadState = await updateDownloadState({ text: '' });
      await sendDownloadStateMessage({ db, downloadState, sendMessage });

      let stateFlags = getStateFlags(downloadState);
      let counter = 0;

      console.info('starting...', {
        allFoldersComplete: stateFlags.allFoldersComplete,
        isRunning: stateFlags.isRunning,
      });

      while (!stateFlags.allFoldersComplete && stateFlags.isRunning) {
        const folderSummaries = downloadState.folderSummaries
          .filter((f) => !IGNORED_FOLDERS.has(f.folder))
          .sort((a, b) => (a.folder > b.folder ? 1 : -1));

        counter++;

        if (counter > 5) {
          const downloadState = await updateDownloadState({
            isPaused: true,
            text: 'Too many retries. Pausing download for now.',
          });

          await sendDownloadStateMessage({ db, downloadState, sendMessage });

          break;
        } else {
          await wait(2000);
        }

        let i = folderSummaries.length;

        console.info(`[startDownload] folderSummaries.length: ${folderSummaries.length}`);
        while (i--) {
          const folderSummary = folderSummaries[i];
          const folderNeedsDownload =
            folderSummary.mediaItemsCount > folderSummary.downloadedCount + folderSummary.corruptedCount;

          if (folderNeedsDownload) {
            downloadState = await setFolderState({ db, folder: folderSummary.folder, state: 'idle' });
          } else {
            downloadState = await setFolderState({ db, folder: folderSummary.folder, state: 'complete' });
          }
        }

        await sendDownloadStateMessage({ db, downloadState, sendMessage });

        let j = folderSummaries.length;
        while (j--) {
          const folderSummary = folderSummaries[j];
          const folderNeedsDownload =
            folderSummary.mediaItemsCount > folderSummary.downloadedCount + folderSummary.corruptedCount;

          stateFlags = getStateFlags(downloadState);

          if (folderNeedsDownload && stateFlags.isRunning) {
            console.info(`[startDownload] Folder needs download: ${folderSummary.folder}`);

            downloadState = await setFolderState({ db, folder: folderSummary.folder, state: 'downloading' });

            await sendDownloadStateMessage({ db, downloadState, sendMessage });

            await downloadFolder({ db, folder: folderSummary.folder, message, sendMessage });
          }

          downloadState = await setFolderState({ db, folder: folderSummary.folder, state: 'complete' });
          await sendDownloadStateMessage({ db, downloadState, sendMessage });
        }

        downloadState = await getDownloadState();
        stateFlags = getStateFlags(downloadState);
      }

      console.info(`[startDownload] allFoldersComplete: ${stateFlags.allFoldersComplete}`);

      if (stateFlags.allFoldersComplete) {
        downloadState = await updateDownloadState({ state: 'complete', text: 'Media item download complete' });
        await sendDownloadStateMessage({ db, downloadState, sendMessage });

        console.info('🎉🎉🎉  Great success. Your journey is complete!!! 🎉🎉🎉');
      }
    } catch (error) {
      console.error(error);
      await updateDownloadState({ isPaused: true, text: 'Pausing due to error' });

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
  const ingestedIds = await getIngestedIds(folder);
  const downloadedIds = await getDownloadedIds(folder);
  const downloadingIds = await getDownloadingIds(folder);
  const mediaItemIds = [...ingestedIds].filter((id) => !downloadedIds.has(id) && !downloadingIds.has(id));
  const text = `Downloading ${mediaItemIds.length} new media items to ${folder}`;

  if (mediaItemIds.length) {
    await updateDownloadState({ state: 'downloading', text });

    sendMessage({ type: MessageType.download, payload: { text } });

    await Promise.all(
      batchMediaItemIds(mediaItemIds).map((mediaItemIds) =>
        downloadMediaItems({ folder, mediaItemIds, db, sendMessage })
      )
    );
  } else {
    console.info(`No media items to download. Re-indexing ${folder}`);
    const indexingComplete = await indexFilesystem({ db, sendMessage, subFolder: folder });

    console.info(`Re-indexing complete: ${folder} -> ${indexingComplete}`);
  }
}

async function setFolderState({
  db,
  folder,
  state,
}: {
  db: LevelDatabase;
  folder: FolderSummary['folder'];
  state: FolderSummary['state'];
}) {
  const { getDownloadState, setDownloadState } = createGettersAndSetters(db);
  const downloadState = await updateFolder(
    { folder, downloadState: await getDownloadState() },
    async (folderSummary: FolderSummary) => {
      folderSummary.state = state;

      return folderSummary;
    }
  );

  await setDownloadState(downloadState);

  return downloadState;
}

async function sendDownloadStateMessage({
  db,
  downloadState,
  sendMessage,
}: {
  db: LevelDatabase;
  downloadState?: DownloadState;
  sendMessage: SendMessage;
}) {
  const { getDownloadState } = createGettersAndSetters(db);
  const state = downloadState ?? (await getDownloadState());

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
