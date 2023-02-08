import fsPromises from 'fs/promises';
import path from 'path';

export async function createAndEmptyFolder(filepath: string) {
  await fsPromises.mkdir(filepath, { recursive: true });

  const files = await fsPromises.readdir(filepath);

  return Promise.all(files.map((file) => fsPromises.unlink(path.join(filepath, file))));
}
