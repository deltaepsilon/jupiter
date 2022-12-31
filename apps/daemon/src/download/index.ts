import {
  DEFAULT_DOWNLOAD_STATE,
  DaemonMessage,
  DownloadAction,
  DownloadState,
  MessageType,
  SendMessage,
  Tokens,
  daemonMessage,
  downloadDataSchema,
} from 'data/daemon';
import { GettersAndSetters, createGettersAndSetters } from '../utils';

import { FilesystemDatabase } from 'daemon/src/db';
import { startDownload } from './start-download';

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
  const { libraryId, urls } = downloadDataSchema.parse(message.payload.data);
  const response = daemonMessage.parse({
    type: MessageType.download,
    payload: { action: message.payload.action },
    uuid,
  });
  const { getIngestedIds, getState, removeMediaItems, setIngestedIds, setMediaItem, setState, setTokens, setUrls } =
    createGettersAndSetters(db);
  const state = getState();
  const isRunning = state.isRunning;

  const { tokens } = downloadDataSchema.parse(message.payload.data);

  switch (message.payload.action) {
    case DownloadAction.init:
      if (!urls) {
        throw new Error('No URLs provided');
      } else {
        setUrls(urls);
      }

      isRunning && startDownload({ db, message, sendMessage });

      break;

    case DownloadAction.start:
      start({
        response,
        setState,
        setTokens,
        state,
        tokens,
      });

      startDownload({ db, message, sendMessage });
      break;

    case DownloadAction.pause:
      pause({ setState, state });

      break;

    case DownloadAction.cancel:
      break;

    case DownloadAction.destroy:
      destroy({
        removeMediaItems,
        setIngestedIds,
        setState,
      });
      break;

    case DownloadAction.addMediaItem: {
      addMediaItem({
        message,
        response,
        getIngestedIds,
        setIngestedIds,
        setMediaItem,
        setState,
        state,
      });
      break;
    }

    default:
      break;
  }

  response.payload.data = downloadDataSchema.parse({ libraryId, state: getState() });

  return sendMessage(response);
}

function start({
  response,
  setState,
  setTokens,
  state,
  tokens,
}: {
  response: DaemonMessage;
  setState: GettersAndSetters['setState'];
  setTokens: GettersAndSetters['setTokens'];
  state: DownloadState;
  tokens?: Tokens;
}) {
  response.payload.text = 'Starting download...';

  if (!state.isIngestComplete) {
    setState({
      ...state,
      isRunning: true,
      text: 'Transferring media items to daemon',
    });
  }

  tokens && setTokens(tokens);
}

function pause({ setState, state }: { setState: GettersAndSetters['setState']; state: DownloadState }) {
  setState({
    ...state,
    isRunning: false,
    text: 'Paused',
  });
}

function destroy({
  removeMediaItems,
  setIngestedIds,
  setState,
}: Pick<GettersAndSetters, 'removeMediaItems' | 'setIngestedIds' | 'setState'>) {
  removeMediaItems();
  setIngestedIds(new Set([]));
  setState(DEFAULT_DOWNLOAD_STATE);
}

function addMediaItem({
  message,
  response,
  getIngestedIds,
  setIngestedIds,
  setMediaItem,
  setState,
  state,
}: {
  message: DaemonMessage;
  response: DaemonMessage;
  getIngestedIds: GettersAndSetters['getIngestedIds'];
  setIngestedIds: GettersAndSetters['setIngestedIds'];
  setMediaItem: GettersAndSetters['setMediaItem'];
  setState: GettersAndSetters['setState'];
  state: DownloadState;
}) {
  const mediaItem = message.payload.data.mediaItem;

  if (!mediaItem) {
    response.payload.error = 'No media item provided';
  } else {
    const ingestedIds = getIngestedIds();
    ingestedIds.add(mediaItem.id);

    setIngestedIds(ingestedIds);
    setMediaItem(mediaItem);
    setState({ ...state, ingestedCount: ingestedIds.size, lastKey: mediaItem.key });
  }
}
