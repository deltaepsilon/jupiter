import md5File from 'md5-file';
import { Exif } from 'data/daemon';
import { repairFilename } from './repair-filename';

export async function getMd5(filepath: string, existingExif?: Exif) {
  const { filepath: repairedFilepath, isRepaired } = await repairFilename(filepath, existingExif);

  return md5File(repairedFilepath).then(async (hash) => {
    return { hash, filepath: repairedFilepath, isRepaired };
  });
}
