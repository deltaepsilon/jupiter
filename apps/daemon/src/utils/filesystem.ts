import fsPromises from 'fs/promises';
import path from 'path';

export async function createAndEmptyFolder(directoryPath: string) {
  await fsPromises.mkdir(directoryPath, { recursive: true });

  const files = await fsPromises.readdir(directoryPath);

  console.log('unlinking', { files });

  return Promise.all(
    files.map((file) => {
      const filepath = path.join(directoryPath, file);

      return fsPromises.unlink(filepath).catch((e) => console.error('failed to unlink file:', filepath, e));
    })
  );
}
