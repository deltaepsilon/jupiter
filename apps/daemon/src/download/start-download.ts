import { DaemonMessage, MessageType, SendMessage } from 'data/daemon';
import { MediaItem, batchGetMediaItemsResponseSchema } from 'data/media-items';

import { FilesystemDatabase } from '../db';
import axios from 'axios';
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
  const { getDownloadedIds, getIngestedIds, getState, setState } = createGettersAndSetters(db);
  const state = getState();

  if (state.isRunning) {
    try {
      const indexingComplete = await indexFilesystem({ db, sendMessage });

      if (indexingComplete) {
        const mediaItemIds = [...getIngestedIds()].filter((id) => !getDownloadedIds().has(id));

        setState({
          ...state,
          isIndexComplete: true,
          text: `Local file index complete. Downloading ${mediaItemIds.length} new media items`,
        });

        await Promise.all(
          batchMediaItemIds(mediaItemIds)
            .slice(0, 1)
            .map((mediaItemIds) => downloadMediaItems({ mediaItemIds, db, sendMessage }))
        );

        throw new Error("Don't forget to set state to complete");

        // setState({ ...state, isDownloadComplete: true, isRunning: false, text: 'Media item download complete' });
      }
    } catch (error) {
      console.log('error', error);
      console.log('instance', error instanceof Error);

      const state = getState();

      setState({ ...state, isRunning: false, text: 'Stopping due to error' });

      if (typeof error === 'string') {
        sendMessage({ type: MessageType.download, payload: { error }, uuid: message.uuid });
      } else if (error instanceof Error) {
        let errorText = error.toString();

        if (errorText.includes('ENOENT')) {
          const matches = errorText.match(/'.+'/);
          errorText = `File not found: ${matches?.[0] || errorText}`;
        }

        sendMessage({ type: MessageType.download, payload: { error: errorText }, uuid: message.uuid });
      }
    }
  }
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
