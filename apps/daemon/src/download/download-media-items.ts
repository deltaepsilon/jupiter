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
import { getExif, getMd5, setExif } from '../exif';

import { FilesystemDatabase } from '../db';
import { MediaItem } from 'data/media-items';
import axios from 'axios';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { refreshMediaItems } from './refresh-media-items';
import { retry } from 'ui/utils/retry';

interface Args {
  folder: string;
  mediaItemIds: string[];
  db: FilesystemDatabase;
  sendMessage: SendMessage;
}

export async function downloadMediaItems({ folder, mediaItemIds, db, sendMessage }: Args) {
  const {
    getDirectory,
    getDownloadedIds,
    getDownloadState,
    getFileIndex,
    getMediaItem,
    setFileIndex,
    setDownloadedIds,
    setDownloadState,
  } = createGettersAndSetters(db);
  const directoryPath = getDirectory().path;
  const downloadDirectory = path.join(directoryPath, DOWNLOADING_FOLDER);
  const downloadState = getDownloadState();
  let mediaItems = mediaItemIds.map((mediaItemId) => getMediaItem(folder, mediaItemId));
  let i = mediaItems.length;
  let stateFlags = getStateFlags(downloadState);

  await fsPromises.mkdir(downloadDirectory, { recursive: true });

  while (i-- && stateFlags.isRunning) {
    const mediaItem = mediaItems[i];
    const downloadedIds = getDownloadedIds(folder);

    if (downloadedIds.has(mediaItem.id)) {
      console.log('skipping download:', mediaItem.id);
      continue;
    }

    const {
      hash,
      filepath,
      mediaItem: updatedMediaItem,
      mediaItems: updatedMediaItems,
    } = await writeFile({ db, downloadDirectory, folder, mediaItem, mediaItems, mediaItemIds });
    const { folder: yearMonthFolder, updated: yearMonthFilepath } = await moveToDateFolder({
      date: new Date(updatedMediaItem.mediaMetadata.creationTime),
      directoryPath,
      filepath,
    });

    updateFileIndex({
      directoryPath,
      filepath: yearMonthFilepath,
      folder: yearMonthFolder,
      getFileIndex,
      hash,
      setFileIndex,
    });

    downloadedIds.add(mediaItem.id);
    setDownloadedIds(folder, downloadedIds);

    const updatedDownloadState = updateFolder(
      { folder: yearMonthFolder, downloadState: getDownloadState() },
      (folder) => {
        folder.state = 'downloading';
        folder.downloadedCount = getDownloadedIds(yearMonthFolder).size;

        return folder;
      }
    );

    setDownloadState(updatedDownloadState);

    sendMessage({
      type: MessageType.download,
      payload: {
        data: downloadDataSchema.parse({
          libraryId: db.libraryId,
          state: updatedDownloadState,
        }),
        text: `Downloaded: ${yearMonthFilepath}`,
      },
    });

    stateFlags = getStateFlags(updatedDownloadState);
    mediaItems = updatedMediaItems;
  }
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
  const response = await axios
    .get(getMediaItemDownloadUrl(mediaItem), { responseType: 'stream' })
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

  return new Promise<{ exif: Exif; hash: string; filepath: string; mediaItem: MediaItem; mediaItems: MediaItem[] }>(
    (resolve, reject) => {
      writeStream.on('error', reject);

      writeStream.on('finish', async () => {
        retry(
          async () => {
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
          },
          { attempts: 5, millis: 1000 }
        )();
      });
    }
  );
}

function getMediaItemDownloadUrl(mediaItem: MediaItem) {
  const isVideo = mediaItem.mimeType.startsWith('video');

  return `${mediaItem.baseUrl}=${isVideo ? 'dv' : 'd'}`;
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
