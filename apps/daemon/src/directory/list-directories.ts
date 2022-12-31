import {
  DaemonMessage,
  MessageType,
  SendMessage,
  decodeMessage,
  encodeMessage,
  listDirectoriesData,
} from 'data/daemon';

import { DB_FOLDER_NAME } from '../db';
import fsPromises from 'fs/promises';
import path from 'path';

const BLACKLIST = new Set([DB_FOLDER_NAME, 'Thumbs.db', '.DS_Store', 'desktop.ini']);

export async function listDirectories(sendMessage: SendMessage, message: DaemonMessage) {
  try {
    const parsedData = listDirectoriesData.parse(message.payload.data);
    const cwd = parsedData.currentDirectory || process.cwd();
    const currentDirectory = path.join(cwd, parsedData.navigate || '');
    const files = await fsPromises.readdir(currentDirectory, { withFileTypes: true });
    const childDirectories = files
      .filter((file) => !file.name.startsWith('.') && !BLACKLIST.has(file.name))
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
