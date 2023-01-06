import {
  DOWNLOADING_FOLDER,
  Exif,
  MessageType,
  SendMessage,
  dateToExifDate,
  downloadDataSchema,
  getStateFlags,
  updateFolder,
} from 'data/daemon';
import { GettersAndSetters, createGettersAndSetters, moveToDateFolder } from '../utils';
import { MediaItem, batchGetMediaItemsResponseSchema } from 'data/media-items';
import { getExif, getMd5, setExif } from '../exif';

import { FilesystemDatabase } from '../db';
import axios from 'axios';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

interface Args {
  folder: string;
  mediaItemIds: string[];
  db: FilesystemDatabase;
  sendMessage: SendMessage;
}

export async function downloadMediaItems({ folder, mediaItemIds, db, sendMessage }: Args) {
  const { getDirectory, getDownloadState, getFileIndex, getMediaItem, setFileIndex, setDownloadState } =
    createGettersAndSetters(db);
  const directoryPath = getDirectory().path;
  const downloadDirectory = path.join(directoryPath, DOWNLOADING_FOLDER);
  let mediaItems = mediaItemIds.map((mediaItemId) => getMediaItem(folder, mediaItemId));
  let i = mediaItems.length;
  let stateFlags = getStateFlags(getDownloadState());

  await fsPromises.mkdir(downloadDirectory, { recursive: true });

  while (i-- && stateFlags.isRunning) {
    const {
      hash,
      filepath,
      mediaItem,
      mediaItems: updatedMediaItems,
    } = await writeFile({ db, downloadDirectory, folder, mediaItem: mediaItems[i], mediaItems, mediaItemIds });
    const { folder: yearMonthFolder, updated: yearMonthFilepath } = await moveToDateFolder({
      date: new Date(mediaItem.mediaMetadata.creationTime),
      directoryPath,
      filepath,
    });

    console.log('yearMonthFilepath', yearMonthFilepath);

    updateFileIndex({
      directoryPath,
      filepath: yearMonthFilepath,
      folder: yearMonthFolder,
      getFileIndex,
      hash,
      setFileIndex,
    });

    const updatedDownloadState = updateFolder(
      { folder: yearMonthFolder, downloadState: getDownloadState() },
      (folder) => {
        folder.downloadedCount++;

        return folder;
      }
    );

    sendMessage({
      type: MessageType.download,
      payload: { data: downloadDataSchema.parse({ libraryId: db.libraryId, state: getDownloadState() }) },
    });

    stateFlags = getStateFlags(updatedDownloadState);
    mediaItems = updatedMediaItems;
  }
}

async function refreshMediaItems({
  db,
  folder,
  mediaItemIds,
}: {
  db: FilesystemDatabase;
  folder: string;
  mediaItemIds: string[];
}) {
  const { getTokens, getUrls, setTokens, setMediaItem } = createGettersAndSetters(db);
  const tokens = getTokens();
  const urls = getUrls();

  const result = await axios.post(urls.batchGetMediaItems, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    mediaItemIds: mediaItemIds.join(','),
  });
  const { accessToken, refreshToken, expiresAt, mediaItemResults } = batchGetMediaItemsResponseSchema.parse(
    result.data
  );

  setTokens({ accessToken, refreshToken, expiresAt: new Date(expiresAt) });

  return mediaItemResults.map(({ mediaItem }) => setMediaItem(folder, mediaItem));
}

async function writeFile({
  db,
  downloadDirectory,
  folder,
  mediaItem,
  mediaItems,
  mediaItemIds,
}: {
  db: FilesystemDatabase;
  downloadDirectory: string;
  folder: string;
  mediaItem: MediaItem;
  mediaItems: MediaItem[];
  mediaItemIds: string[];
}) {
  const response = await axios.get(mediaItem.baseUrl, { responseType: 'stream' }).catch(async (err) => {
    const isBaseUrlExpired = err.response.status === 403;

    if (isBaseUrlExpired) {
      mediaItems = await refreshMediaItems({ db, folder, mediaItemIds });
      const updatedMediaItem = mediaItems.find((m) => m.id === mediaItem.id);

      if (updatedMediaItem) mediaItem = updatedMediaItem;

      return axios.get(mediaItem.baseUrl, { responseType: 'stream' });
    } else {
      throw err;
    }
  });
  const downloadingFilepath = path.join(downloadDirectory, mediaItem.filename);
  const writeStream = fs.createWriteStream(downloadingFilepath);

  response.data.pipe(writeStream);

  return new Promise<{ exif: Exif; hash: string; filepath: string; mediaItem: MediaItem; mediaItems: MediaItem[] }>(
    (resolve, reject) => {
      writeStream.on('error', reject);

      writeStream.on('finish', async () => {
        try {
          const { hash, filepath } = await getMd5(downloadingFilepath);
          let exif = await getExif(filepath);

          if (!exif.ModifyDate || !exif.CreateDate) {
            const dateTimeOriginal = dateToExifDate(mediaItem.mediaMetadata.creationTime, true);

            exif = await setExif(filepath, {
              DateTimeOriginal: dateTimeOriginal,
              CreateDate: dateTimeOriginal,
              ModifyDate: dateTimeOriginal,
            });
          }

          resolve({ exif, hash, filepath, mediaItem, mediaItems });
        } catch (error) {
          reject(error);
        }
      });
    }
  );
}

function updateFileIndex({
  directoryPath,
  filepath,
  folder,
  getFileIndex,
  hash,
  setFileIndex,
}: {
  directoryPath: string;
  filepath: string;
  folder: string;
  getFileIndex: GettersAndSetters['getFileIndex'];
  hash: string;
  setFileIndex: GettersAndSetters['setFileIndex'];
}) {
  const relativeFilepath = path.relative(directoryPath, filepath);
  const fileIndex = getFileIndex(folder, hash);

  fileIndex.relativePaths.push(relativeFilepath);

  setFileIndex(folder, fileIndex);
}
