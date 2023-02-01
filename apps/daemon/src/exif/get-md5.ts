import fsPromises from 'fs/promises';
import { getExif } from './get-exif';
import md5File from 'md5-file';

export async function getMd5(filepath: string) {
  const exif = await getExif(filepath);
  const filenameParts = filepath.split('.').slice(0, -1);
  let repairedFilepath = [...filenameParts, exif.FileTypeExtension].join('.');
  const filepathNeedsRepair = repairedFilepath !== filepath;

  if (filepathNeedsRepair) {
    repairedFilepath = `${filepath}.${exif.FileTypeExtension}`;

    await fsPromises.rename(filepath, repairedFilepath);
  }

  return md5File(repairedFilepath).then(async (hash) => {
    return { hash, filepath: repairedFilepath, isRepaired: filepathNeedsRepair };
  });
}
