import { DOWNLOADING_FOLDER } from 'data/daemon';
import { FilesystemDatabase } from '../db';
import { createGettersAndSetters } from './create-getters-and-setters';
import path from 'path';

export function getDownloadDirectory(db: FilesystemDatabase) {
  const { getDirectory } = createGettersAndSetters(db);
  const directoryPath = getDirectory().path;

  return { directoryPath, downloadDirectory: path.join(directoryPath, DOWNLOADING_FOLDER) };
}
