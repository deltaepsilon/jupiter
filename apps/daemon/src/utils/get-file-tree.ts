import { DB_FOLDER_NAME } from '../db';
import fsPromises from 'fs/promises';
import path from 'path';

export async function getFileTree(
  dir: string,
  blacklist = new Set([DB_FOLDER_NAME, 'Thumbs.db', '.DS_Store', 'desktop.ini'])
): Promise<string[]> {
  const filesOrDirectories = await fsPromises.readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = filesOrDirectories.filter((file) => !blacklist.has(file.name) && !file.isDirectory());
  const directories = filesOrDirectories.filter((file) => !blacklist.has(file.name) && file.isDirectory());

  const filepaths = files.map((file) => path.join(dir, file.name));
  const directoryFilepaths = await Promise.all(
    directories.flatMap((directory) => getFileTree(path.join(dir, directory.name)))
  );

  return [...filepaths, ...directoryFilepaths.flat()];
}
