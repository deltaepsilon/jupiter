import {
  DaemonMessage,
  FolderAction,
  MessageType,
  SendMessage,
  folderMessageDataSchema,
  getFolderDataMessage,
} from 'data/daemon';

import { FilesystemDatabase } from 'daemon/src/db';
import { createGettersAndSetters } from '../utils';

export async function handleFolderMessage({
  db,
  message,
  sendMessage,
}: {
  db: FilesystemDatabase;
  message: DaemonMessage;
  sendMessage: SendMessage;
}) {
  const { getFolderData } = createGettersAndSetters(db);
  const { folder } = folderMessageDataSchema.parse(message.payload.data);

  switch (message.payload.action) {
    case FolderAction.get:
      {
        const folderData = getFolderData(folder);

        sendMessage({
          type: MessageType.folder,
          payload: { action: FolderAction.get, data: { folder, folderData: getFolderDataMessage(folderData) } },
          uuid: message.uuid,
        });
      }
      break;

    default:
      break;
  }
}
