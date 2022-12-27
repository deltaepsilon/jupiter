import {
  DaemonMessage,
  DownloadAction,
  DownloadDbKeys,
  DownloadState,
  MessageType,
  SendMessage,
  Tokens,
  daemonMessage,
  decodeMessage,
  downloadDataSchema,
  downloadStateSchema,
  encodeMessage,
  tokensSchema,
} from 'data/daemon';
import { createGettersAndSetters, refreshTokens } from '../utils';

import { FilesystemDatabase } from 'daemon/src/db';

export async function download({
  db,
  message,
  sendMessage,
}: {
  db: FilesystemDatabase;
  message: DaemonMessage;
  sendMessage: SendMessage;
}) {
  const uuid = message.uuid;
  const { libraryId } = downloadDataSchema.parse(message.payload.data);
  const response = daemonMessage.parse({
    type: MessageType.download,
    payload: { action: message.payload.action },
    uuid,
  });
  const { getState, getTokens, removeMediaItems, setMediaItem, setState, setTokens } = createGettersAndSetters(db);
  const state = getState();
  const { tokens } = downloadDataSchema.parse(message.payload.data);

  switch (message.payload.action) {
    case DownloadAction.init:
      break;

    case DownloadAction.start:
      response.payload.text = 'Starting download...';

      if (!state.isIngestComplete) {
        setState({
          ...state,
          isRunning: true,
          text: 'Transferring media items to daemon',
        });
      }

      tokens && setTokens(tokens);

      break;

    case DownloadAction.pause:
      setState({
        ...state,
        isRunning: false,
        text: 'Paused',
      });

      break;

    case DownloadAction.cancel:
      break;

    case DownloadAction.destroy:
      removeMediaItems();
      setState({
        isRunning: false,
        isDownloadComplete: false,
        isIngestComplete: false,
        ingestedCount: 0,
        downloadedCount: 0,
        lastKey: undefined,
        progress: 0,
        text: 'Idle',
      });
      break;

    case DownloadAction.addMediaItem: {
      const mediaItem = message.payload.data.mediaItem;

      if (!mediaItem) {
        response.payload.error = 'No media item provided';
      } else {
        setMediaItem(mediaItem);
        setState({ ...state, ingestedCount: state.ingestedCount + 1, lastKey: mediaItem.key });
      }
      break;
    }

    default:
      break;
  }

  response.payload.data = downloadDataSchema.parse({ libraryId, state: getState() });

  return sendMessage(response);
}
