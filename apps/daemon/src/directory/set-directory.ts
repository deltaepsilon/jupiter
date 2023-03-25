import { DaemonMessage, MessageType, SendMessage, setDirectoryData } from 'data/daemon';

import { createGettersAndSetters } from '../utils';
import { createLevelDatabase } from '../level';

export async function setDirectory(sendMessage: SendMessage, message: DaemonMessage) {
  try {
    const { directory, libraryId } = setDirectoryData.parse(message.payload.data);
    const data = setDirectoryData.parse({ directory, libraryId });
    const db = await createLevelDatabase({ directory, libraryId });
    const { setDirectory } = createGettersAndSetters(db);

    await setDirectory({ path: directory, name: directory });

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
