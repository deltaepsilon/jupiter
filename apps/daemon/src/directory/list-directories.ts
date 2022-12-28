import {
  DaemonMessage,
  MessageType,
  SendMessage,
  decodeMessage,
  encodeMessage,
  listDirectoriesData,
} from 'data/daemon';

import fs from 'fs';
import path from 'path';

export async function listDirectories(sendMessage: SendMessage, message: DaemonMessage) {
  try {
    const parsedData = listDirectoriesData.parse(message.payload.data);
    const cwd = parsedData.currentDirectory || process.cwd();
    const currentDirectory = path.join(cwd, parsedData.navigate || '');
    const childDirectories = fs
      .readdirSync(currentDirectory, { withFileTypes: true })
      .map((file) => ({ name: file.name, isDirectory: file.isDirectory() }));
    const data = listDirectoriesData.parse({ currentDirectory, childDirectories });

    sendMessage({
      uuid: message.uuid,
      payload: { text: currentDirectory, data },
      type: MessageType.directory,
    });
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
