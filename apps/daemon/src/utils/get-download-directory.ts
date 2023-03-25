import { DOWNLOADING_FOLDER } from 'data/daemon';
import { LevelDatabase } from '../level';
import { createGettersAndSetters } from './create-getters-and-setters';
import path from 'path';

export async function getDownloadDirectory(db: LevelDatabase) {
  const { getDirectory } = createGettersAndSetters(db);
  const directoryPath = (await getDirectory()).path;

  return { directoryPath, downloadDirectory: path.join(directoryPath, DOWNLOADING_FOLDER) };
}
