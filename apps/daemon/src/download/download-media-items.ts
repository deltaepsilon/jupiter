import {
  DOWNLOADING_FOLDER,
  Exif,
  MessageType,
  SendMessage,
  dateToExifDate,
  downloadMessageDataSchema,
  getStateFlags,
  progressMessageDataSchema,
  updateFolder,
} from 'data/daemon';
import { GettersAndSetters, createGettersAndSetters, moveToDateFolder } from '../utils';
import { getExif, getMd5, setExif } from '../exif';

import { FilesystemDatabase } from '../db';
import { MediaItem } from 'data/media-items';
import axios from 'axios';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { multiplex } from 'ui/utils/multiplex';
import path from 'path';
import { refreshMediaItems } from './refresh-media-items';
import { retry } from 'ui/utils/retry';

const MULTIPLEX_THREADS = 10;

interface Args {
  folder: string;
  mediaItemIds: string[];
  db: FilesystemDatabase;
  sendMessage: SendMessage;
}

export async function downloadMediaItems({ folder, mediaItemIds, db, sendMessage }: Args) {
  const { getDirectory, getDownloadedIds, getDownloadState, getMediaItem, updateDownloadingIds } =
    createGettersAndSetters(db);
  const directoryPath = getDirectory().path;
  const downloadDirectory = path.join(directoryPath, DOWNLOADING_FOLDER);
  const downloadState = getDownloadState();
  const addToMultiplex = multiplex(MULTIPLEX_THREADS);
  let mediaItems = mediaItemIds.map((mediaItemId) => getMediaItem(folder, mediaItemId));
  let i = mediaItems.length;
  let stateFlags = getStateFlags(downloadState);

  await fsPromises.mkdir(downloadDirectory, { recursive: true });

  while (i-- && stateFlags.isRunning) {
    const mediaItem = mediaItems[i];
    const downloadedIds = getDownloadedIds(folder);

    if (downloadedIds.has(mediaItem.id)) {
      continue;
    }

    const { filePromise, mediaItems: updatedMediaItems } = await writeFile({
      db,
      downloadDirectory,
      folder,
      mediaItem,
      mediaItems,
      mediaItemIds,
      sendMessage,
    });
    mediaItems = updatedMediaItems;
    stateFlags = getStateFlags(getDownloadState());

    addToMultiplex(async () => {
      updateDownloadingIds(folder, (downloadingIds) => downloadingIds.add(mediaItem.id));
      const updatedDownloadState = await handleFilePromise({
        db,
        directoryPath,
        filePromise,
        folder,
        mediaItem,
        sendMessage,
      });

      updateDownloadingIds(folder, (downloadingIds) => (downloadingIds.delete(mediaItem.id), downloadingIds));

      stateFlags = getStateFlags(updatedDownloadState);
    });
  }

  await addToMultiplex.promise;
}

async function writeFile({
  db,
  downloadDirectory,
  folder,
  mediaItem,
  mediaItems,
  mediaItemIds,
  sendMessage,
}: {
  db: FilesystemDatabase;
  downloadDirectory: string;
  folder: string;
  mediaItem: MediaItem;
  mediaItems: MediaItem[];
  mediaItemIds: string[];
  sendMessage: SendMessage;
}) {
  const response = await axios
    .get(getMediaItemDownloadUrl(mediaItem), {
      onDownloadProgress: (progressEvent) =>
        sendMessage({
          type: MessageType.progress,
          payload: {
            data: progressMessageDataSchema.parse({
              id: mediaItem.id,
              folder,
              filename: mediaItem.filename,
              progressEvent: progressEvent,
            }),
          },
        }),
      responseType: 'stream',
    })
    .catch(async (err) => {
      const isBaseUrlExpired = err.response.status === 403;

      if (isBaseUrlExpired) {
        mediaItems = await refreshMediaItems({ db, folder, mediaItemIds });

        const updatedMediaItem = mediaItems.find((m) => m.id === mediaItem.id);

        if (updatedMediaItem) mediaItem = updatedMediaItem;

        return axios.get(getMediaItemDownloadUrl(mediaItem), { responseType: 'stream' });
      } else {
        console.info('error downloading:', mediaItem.id, err.response.status, err.response.statusText);
        throw err.response.statusText;
      }
    });
  const downloadingFilepath = path.join(downloadDirectory, mediaItem.filename);
  const writeStream = fs.createWriteStream(downloadingFilepath);

  response.data.pipe(writeStream);

  const filePromise = new Promise<{
    exif: Exif;
    hash: string;
    filepath: string;
  }>((resolve, reject) => {
    writeStream.on('error', reject);

    writeStream.on('finish', async () => {
      retry(
        async ({ attempt }) => {
          let exif = await getExif(downloadingFilepath);

          if (!exif.ModifyDate || !exif.CreateDate || !exif.DateTimeOriginal) {
            const dateTimeOriginal = dateToExifDate(mediaItem.mediaMetadata.creationTime, true);

            exif = await setExif(downloadingFilepath, {
              GoogleMediaItemId: mediaItem.id,
              DateTimeOriginal: dateTimeOriginal,
              CreateDate: dateTimeOriginal,
              ModifyDate: dateTimeOriginal,
            });
          } else {
            exif = await setExif(downloadingFilepath, {
              GoogleMediaItemId: mediaItem.id,
            });
          }

          const { hash, filepath } = await getMd5(downloadingFilepath);

          resolve({ exif, hash, filepath });
        },
        { attempts: 30, millis: 1000, failSilently: true }
      )().catch(reject);
    });
  });

  return { filePromise, mediaItem, mediaItems };
}

function getMediaItemDownloadUrl(mediaItem: MediaItem) {
  const isVideo = mediaItem.mimeType.startsWith('video');

  return `${mediaItem.baseUrl}=${isVideo ? 'dv' : 'd'}`;
}

async function handleFilePromise({
  db,
  directoryPath,
  filePromise,
  folder,
  mediaItem,
  sendMessage,
}: {
  db: FilesystemDatabase;
  directoryPath: string;
  filePromise: Promise<{ exif: Exif; hash: string; filepath: string }>;
  folder: string;
  mediaItem: MediaItem;
  sendMessage: SendMessage;
}) {
  const {
    getDownloadedIds,
    getDownloadState,
    getFileIndex,
    getRelativeFilePaths,
    setDownloadState,
    setFileIndex,
    updateDownloadedIds,
  } = createGettersAndSetters(db);

  const { hash, filepath } = await filePromise;

  const { folder: yearMonthFolder, updated: yearMonthFilepath } = await moveToDateFolder({
    date: new Date(mediaItem.mediaMetadata.creationTime),
    directoryPath,
    filepath,
  });

  updateFileIndex({
    directoryPath,
    filepath: yearMonthFilepath,
    folder: yearMonthFolder,
    getFileIndex,
    hash,
    mediaItemId: mediaItem.id,
    setFileIndex,
  });

  updateDownloadedIds(folder, (downloadIds) => downloadIds.add(mediaItem.id));

  const updatedDownloadState = updateFolder(
    { folder: yearMonthFolder, downloadState: getDownloadState() },
    (folderSummary) => {
      folderSummary.state = 'downloading';
      folderSummary.downloadedCount = getDownloadedIds(yearMonthFolder).size;
      folderSummary.indexedCount = getRelativeFilePaths(yearMonthFolder).size;

      return folderSummary;
    }
  );

  setDownloadState(updatedDownloadState);

  sendMessage({
    type: MessageType.download,
    payload: {
      data: downloadMessageDataSchema.parse({
        libraryId: db.libraryId,
        state: updatedDownloadState,
      }),
      // text: `Downloaded: ${yearMonthFilepath}`,
    },
  });

  return updatedDownloadState;
}

function updateFileIndex({
  directoryPath,
  filepath,
  folder,
  getFileIndex,
  hash,
  mediaItemId,
  setFileIndex,
}: {
  directoryPath: string;
  filepath: string;
  folder: string;
  getFileIndex: GettersAndSetters['getFileIndex'];
  hash: string;
  mediaItemId: string;
  setFileIndex: GettersAndSetters['setFileIndex'];
}) {
  const relativeFilepath = path.relative(directoryPath, filepath);
  const fileIndex = getFileIndex(folder, hash);

  fileIndex.mediaItemId = mediaItemId;
  fileIndex.relativePaths.push(relativeFilepath);

  setFileIndex(folder, fileIndex);
}
