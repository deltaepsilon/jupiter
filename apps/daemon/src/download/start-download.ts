import { MediaItem, batchGetMediaItemsResponseSchema } from 'data/media-items';
import { createGettersAndSetters, refreshTokens } from '../utils';

import { FilesystemDatabase } from '../db';
import { SendMessage } from 'data/daemon';
import axios from 'axios';
import fsPromise from 'fs/promises';
import { getMd5 } from '../exif';
import path from 'path';

const BATCH_SIZE = 50;

export async function startDownload({ db, sendMessage }: { db: FilesystemDatabase; sendMessage: SendMessage }) {
  const { getIngestedIds, getState, getTokens, getUrls, setTokens } = createGettersAndSetters(db);
  const tokens = getTokens();
  const state = getState();
  const urls = getUrls();
  const ingestedIds = getIngestedIds();
  const mediaItemId = [...ingestedIds][0];

  if (state.isRunning) {
    try {
      /**
       * - Index the filesystem
       * - Find the next undownloaded media item
       *  -- Can we use the filesystem as the source of truth???
       *
       * - Attempt to download it
       * - If the url has expired, add it to a batchGetMediaItems request and update the local copy of the mediaItem
       * - Add mediaItem to filesystem index
       * - Recur
       */

      await indexFilesystem(db);

      throw 'TODO: Implement';

      // TODO: Don't refresh if unecessary
      const result = await axios.post(urls.batchGetMediaItems, {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        mediaItemIds: [mediaItemId].join(','),
      });
      const { accessToken, refreshToken, expiresAt, mediaItemResults } = batchGetMediaItemsResponseSchema.parse(
        result.data
      );

      const results = await Promise.all(mediaItemResults.map(async ({ mediaItem }) => writeMediaItem(mediaItem)));

      setTokens({ accessToken, refreshToken, expiresAt: new Date(expiresAt) });

      console.log('results', results);
    } catch (error) {
      console.log('error', error);
    }
  }
}

async function writeMediaItem(mediaItem: MediaItem) {
  return { id: mediaItem.id };
}

async function indexFilesystem(db: FilesystemDatabase, incomingPath = '') {
  const { getDirectory, getState, getFileIndex, setFileIndex } = createGettersAndSetters(db);
  const directory = getDirectory();
  const directoryPath = incomingPath || directory.path;

  if (!directory) {
    throw new Error('Directory not set');
  }

  const files = await fsPromise.readdir(directoryPath, { withFileTypes: true });

  await Promise.all(
    files.map(async (file) => {
      const fileOrFolderPath = path.resolve(directoryPath, file.name);

      if (file.isDirectory()) {
        console.log('found a directory', fileOrFolderPath);
        // indexFilesystem(db, fileOrFolderPath);
      } else {
        const file = await getMd5(fileOrFolderPath);

        console.log('file', file);
      }
    })
  );

  console.log(files);
}
