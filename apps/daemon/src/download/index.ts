import { DaemonMessage, DownloadAction, MessageType, SendMessage, decodeMessage, encodeMessage } from 'data/daemon';

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
  switch (message.payload.action) {
    case DownloadAction.start:
      console.log('start download', message.payload);
      return;

    case DownloadAction.pause:
      console.log('pause download', message.payload);
      return;

    default:
      break;
  }
}
