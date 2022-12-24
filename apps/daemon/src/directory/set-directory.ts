import { DaemonMessage, MessageType, SendMessage, decodeMessage, encodeMessage, setDirectoryData } from 'data/daemon';

import { createFilesystemDatabase } from '../db';

export async function setDirectory(sendMessage: SendMessage, message: DaemonMessage) {
  try {
    const { directory, libraryId } = setDirectoryData.parse(message.payload.data);
    const data = setDirectoryData.parse({ directory, libraryId });
    const db = createFilesystemDatabase({ directory, libraryId });

    db.set('directory', directory);

    sendMessage({
      uuid: message.uuid,
      payload: { text: `Setting directory: ${directory}`, data },
      type: MessageType.directory,
    });

    return db;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendMessage({
        uuid: message.uuid,
        payload: { error: error.message },
        type: MessageType.directory,
      });
    }
  }
}
