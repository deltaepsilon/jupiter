import md5File from 'md5-file';
import { repairFilename } from './repair-filename';

export async function getMd5(filepath: string) {
  const { filepath: repairedFilepath, isRepaired } = await repairFilename(filepath);

  return md5File(repairedFilepath).then(async (hash) => {
    return { hash, filepath: repairedFilepath, isRepaired };
  });
}
