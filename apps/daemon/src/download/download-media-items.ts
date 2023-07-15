import {
  CORRUPTED_FOLDER,
  DownloadAction,
  Exif,
  MessageType,
  SendMessage,
  dateToExifDate,
  downloadMessageDataSchema,
  getStateFlags,
  invalidateMediaItemsMessageDataSchema,
  progressMessageDataSchema,
  updateFolder,
} from 'data/daemon';
import { GettersAndSetters, SEPARATOR, createGettersAndSetters, getFolderFromDate, moveToDateFolder } from '../utils';
import { MediaItem, MediaItems, getMediaItemKeys } from 'data/media-items';
import { SetExifError, getExif, getMd5, setExif } from '../exif';
import axios, { AxiosProgressEvent } from 'axios';
import { multiplex, retry } from 'ui/utils';

import { LevelDatabase } from '../level';
import debounce from 'lodash/debounce';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { getDownloadDirectory } from '../utils';
import path from 'path';
import { refreshMediaItems } from './refresh-media-items';

const MULTIPLEX_THREADS = 5;

interface Args {
  folder: string;
  mediaItemIds: string[];
  db: LevelDatabase;
  sendMessage: SendMessage;
}

export async function downloadMediaItems({ folder, mediaItemIds, db, sendMessage }: Args) {
  const { getDownloadedIds, getDownloadState, getMediaItem, updateDownloadingIds } = createGettersAndSetters(db);
  const { directoryPath, downloadDirectory } = await getDownloadDirectory(db);
  const downloadState = await getDownloadState();
  const multiplexer = multiplex(MULTIPLEX_THREADS);
  let mediaItems = (
    await Promise.all(
      mediaItemIds.map(async (mediaItemId) =>
        getMediaItem(folder, mediaItemId).catch(() => {
          console.error(`[downloadMediaItems] mediaItem not found: ${folder}/${mediaItemId}`);

          return null;
        })
      )
    )
  ).filter((mediaItem) => mediaItem !== null) as MediaItems;
  let i = mediaItems.length;
  let stateFlags = getStateFlags(downloadState);

  console.info(`🤖 Downloading with ${MULTIPLEX_THREADS} threads.`);

  while (i-- && stateFlags.isRunning) {
    const mediaItem = mediaItems[i];
    const downloadedIds = await getDownloadedIds(folder);

    if (mediaItem.isInvalid || downloadedIds.has(mediaItem.id)) {
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
    stateFlags = getStateFlags(await getDownloadState());

    multiplexer.add(async () => {
      await updateDownloadingIds(folder, (downloadingIds) => downloadingIds.add(mediaItem.id));

      const updatedDownloadState = await handleFilePromise({
        db,
        directoryPath,
        filePromise,
        folder,
        mediaItem,
        sendMessage,
      });

      await updateDownloadingIds(folder, (downloadingIds) => (downloadingIds.delete(mediaItem.id), downloadingIds));

      stateFlags = getStateFlags(updatedDownloadState);
    });
  }

  await multiplexer.getPromise();
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
  db: LevelDatabase;
  downloadDirectory: string;
  folder: string;
  mediaItem: MediaItem;
  mediaItems: MediaItems;
  mediaItemIds: string[];
  sendMessage: SendMessage;
}) {
  const { getDownloadState, getIngestedIds, removeIngestedIds, removeMediaItemsByIds, setDownloadState } =
    createGettersAndSetters(db);
  function onDownloadProgress(progressEvent: AxiosProgressEvent) {
    const folder = getFolderFromDate(mediaItem.mediaMetadata.creationTime);

    console.info(
      'download progress: ',
      folder,
      mediaItem.filename,
      `${Math.round((progressEvent.progress ?? 0) * 100)}%`
    );

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
    });
  }

  async function invalidateMediaIds(invalidMediaIds: string[], mediaItems: MediaItems) {
    if (invalidMediaIds.length) {
      const invalidMediaItems = mediaItems.filter((m) => invalidMediaIds.includes(m.id));
      const invalidMediaKeys = getMediaItemKeys(invalidMediaItems);

      removeMediaItemsByIds(folder, invalidMediaIds);
      removeIngestedIds(folder, invalidMediaIds);

      const updatedDownloadState = await updateFolder(
        { folder, downloadState: await getDownloadState() },
        async (folderSummary) => {
          const ingestedIds = await getIngestedIds(folder);
          folderSummary.mediaItemsCount = ingestedIds.size;
          folderSummary.updated = new Date();

          return folderSummary;
        }
      );

      await setDownloadState(updatedDownloadState);

      sendMessage({
        type: MessageType.download,
        payload: {
          action: DownloadAction.invalidateMediaItems,
          data: invalidateMediaItemsMessageDataSchema.parse({ invalidMediaIds, invalidMediaKeys }),
          text: `Invalidated ${invalidMediaIds.length} deleted media items`,
        },
      });

      sendMessage({
        type: MessageType.download,
        payload: {
          data: downloadMessageDataSchema.parse({
            libraryId: db.libraryId,
            state: updatedDownloadState,
          }),
        },
      });
    }
  }

  const onDownloadProgressDebounced = debounce(onDownloadProgress, 500);
  const response = await axios
    .get(getMediaItemDownloadUrl(mediaItem), {
      onDownloadProgress: onDownloadProgressDebounced,
      responseType: 'stream',
    })
    .catch(async (err) => {
      const isBaseUrlExpired = !err.response || err.response.status !== 200;

      if (isBaseUrlExpired) {
        const refreshed = await refreshMediaItems({ db, folder, mediaItemIds });
        const updatedMediaItem = refreshed.mediaItems.find((m) => m.id === mediaItem.id);

        await invalidateMediaIds(refreshed.invalidMediaIds, mediaItems);

        mediaItems = mediaItems.map((mediaItem) => {
          const refreshedMediaItem = refreshed.mediaItems.find((m) => m.id === mediaItem.id);

          if (refreshedMediaItem) {
            return refreshedMediaItem;
          } else {
            mediaItem.isInvalid = true;

            return mediaItem;
          }
        });

        if (updatedMediaItem) {
          mediaItem = updatedMediaItem;
        } else {
          return null;
        }

        return axios.get(getMediaItemDownloadUrl(mediaItem), {
          onDownloadProgress: onDownloadProgressDebounced,
          responseType: 'stream',
        });
      } else {
        console.info('error downloading:', mediaItem.id, err.response?.status, err.response?.statusText);
        // throw err.response.statusText;
      }
    });

  if (!response) {
    return { filePromise: Promise.resolve(null), mediaItems };
  } else {
    let downloadingFilepath = path.join(downloadDirectory, `${mediaItem.id}${SEPARATOR}${mediaItem.filename}`);
    const writeStream = fs.createWriteStream(downloadingFilepath);

    response.data.pipe(writeStream);

    const filePromise = new Promise<{
      exif: Exif;
      hash: string;
      filepath: string;
    } | null>((resolve, reject) => {
      writeStream.on('error', reject);

      writeStream.on('finish', async () => {
        retry(
          async () => {
            let exif = await getExif(downloadingFilepath);

            const isMissingDates = !exif.ModifyDate || !exif.CreateDate || !exif.DateTimeOriginal;
            const dateTimeOriginal = dateToExifDate(mediaItem.mediaMetadata.creationTime, true);
            let setExifPayload: Partial<Exif> = isMissingDates
              ? {
                  GoogleMediaItemId: mediaItem.id,
                  DateTimeOriginal: dateTimeOriginal,
                  CreateDate: dateTimeOriginal,
                  ModifyDate: dateTimeOriginal,
                }
              : {
                  GoogleMediaItemId: mediaItem.id,
                };

            const setExifResult = await setExif(downloadingFilepath, setExifPayload).catch(
              getHandleSetExifError({
                db,
                folder,
                mediaItem,
                sendMessage,
              })
            );

            if (setExifResult === false) {
              return resolve(null);
            } else if (typeof setExifResult === 'object') {
              exif = setExifResult.exif;
              downloadingFilepath = setExifResult.filepath;

              const { hash, filepath } = await getMd5(downloadingFilepath);

              resolve({ exif, hash, filepath });
            } else {
              throw new Error(`setExif failed: ${mediaItem.filename}`);
            }
          },
          { attempts: 30, millis: 1000, failSilently: true }
        )().catch(reject);
      });
    });

    return { filePromise, mediaItems };
  }
}

function getMediaItemDownloadUrl(mediaItem: MediaItem) {
  const isVideo = mediaItem.mimeType.startsWith('video');

  return `${mediaItem.baseUrl}=${isVideo ? 'dv' : 'd'}`;
}

function getHandleSetExifError({
  db,
  folder,
  mediaItem,
  sendMessage,
}: {
  db: LevelDatabase;
  folder: string;
  mediaItem: MediaItem;
  sendMessage: SendMessage;
}) {
  const {
    getDirectory,
    getFileIndex,
    setFileIndex,
    updateCorruptedIds,
    updateDownloadedIds,
    getDownloadState,
    getRelativeFilePaths,
    getDownloadedIds,
    getCorruptedIds,
    setDownloadState,
  } = createGettersAndSetters(db);
  return async function handleSetExifError(e: SetExifError) {
    const { base } = path.parse(e.filepath);
    const cleanBase = base.split(SEPARATOR).pop() ?? base;
    const directoryPath = path.join((await getDirectory()).path, CORRUPTED_FOLDER);
    const corruptFilepath = path.join(directoryPath, cleanBase);
    const { hash, filepath } = await getMd5(e.filepath);

    console.info(`Sending corrupt file to ${CORRUPTED_FOLDER}: ${mediaItem.filename}`);

    await fsPromises.mkdir(directoryPath, { recursive: true });
    await fsPromises.rename(filepath, corruptFilepath);

    await updateFileIndex({
      directoryPath,
      filepath: base,
      folder: CORRUPTED_FOLDER,
      getFileIndex,
      hash,
      mediaItemId: mediaItem.id,
      setFileIndex,
    });

    await updateCorruptedIds(folder, (corruptedIds) => corruptedIds.add(mediaItem.id));
    await updateDownloadedIds(CORRUPTED_FOLDER, (downloadIds) => downloadIds.add(mediaItem.id));

    let updatedDownloadState = await updateFolder(
      { folder, downloadState: await getDownloadState() },
      async (folderSummary) => {
        folderSummary.corruptedCount = (await getCorruptedIds(folder)).size;

        return folderSummary;
      }
    );

    updatedDownloadState = await updateFolder(
      { folder: CORRUPTED_FOLDER, downloadState: updatedDownloadState },
      async (folderSummary) => {
        folderSummary.state = 'downloading';
        folderSummary.downloadedCount = (await getDownloadedIds(CORRUPTED_FOLDER)).size;
        folderSummary.indexedCount = (await getRelativeFilePaths(CORRUPTED_FOLDER)).size;

        return folderSummary;
      }
    );

    await setDownloadState(updatedDownloadState);

    sendMessage({
      type: MessageType.download,
      payload: {
        data: downloadMessageDataSchema.parse({
          libraryId: db.libraryId,
          state: updatedDownloadState,
        }),
      },
    });

    return false;
  };
}

async function handleFilePromise({
  db,
  directoryPath,
  filePromise,
  folder,
  mediaItem,
  sendMessage,
}: {
  db: LevelDatabase;
  directoryPath: string;
  filePromise: Promise<{ exif: Exif; hash: string; filepath: string } | null>;
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

  const fileResult = await filePromise;

  if (!fileResult) {
    return getDownloadState();
  } else {
    const { hash, filepath } = fileResult;

    const { folder: yearMonthFolder, updated: yearMonthFilepath } = await moveToDateFolder({
      date: new Date(mediaItem.mediaMetadata.creationTime),
      directoryPath,
      filepath,
    });

    await updateFileIndex({
      directoryPath,
      filepath: yearMonthFilepath,
      folder: yearMonthFolder,
      getFileIndex,
      hash,
      mediaItemId: mediaItem.id,
      setFileIndex,
    });

    await updateDownloadedIds(folder, (downloadIds) => downloadIds.add(mediaItem.id));

    const updatedDownloadState = await updateFolder(
      { folder: yearMonthFolder, downloadState: await getDownloadState() },
      async (folderSummary) => {
        folderSummary.state = 'downloading';
        folderSummary.downloadedCount = (await getDownloadedIds(yearMonthFolder)).size;
        folderSummary.indexedCount = (await getRelativeFilePaths(yearMonthFolder)).size;

        return folderSummary;
      }
    );

    await setDownloadState(updatedDownloadState);

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
}

async function updateFileIndex({
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
  const fileIndex = await getFileIndex(folder, hash);

  fileIndex.mediaItemId = mediaItemId;
  fileIndex.relativePaths.push(relativeFilepath);

  await setFileIndex(folder, fileIndex);
}
