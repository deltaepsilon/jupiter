import fsPromises from 'fs/promises';
import { getExif } from './get-exif';
import md5File from 'md5-file';

export async function getMd5(filepath: string) {
  const exif = await getExif(filepath);
  const filenameParts = filepath.split('.').slice(0, -1);
  const repairedFilepath = [...filenameParts, exif.FileTypeExtension].join('.');
  const filepathNeedsRepair = repairedFilepath !== filepath;

  if (filepathNeedsRepair) {
    await fsPromises.rename(filepath, repairedFilepath);
  }

  return md5File(repairedFilepath).then(async (hash) => {
    return { hash, filepath: repairedFilepath, isRepaired: filepathNeedsRepair };
  });
}
