import { CONFIG_PATH, EXIFTOOL_PATH } from './data';
import { Exif, exifSchema } from 'data/daemon';

import { execFile } from 'child_process';
import fsPromises from 'fs/promises';
import { getExif } from './get-exif';
import { repairFilename } from './repair-filename';

export async function setExif(filepath: string, exif: Partial<Exif>) {
  const args = Object.entries(exif).reduce(
    (acc, [key, value]) => {
      acc.push(`-${key}=${value}`);

      return acc;
    },
    ['-config', CONFIG_PATH] as string[]
  );

  const { isRepaired, repairedFilepath, stdout } = await new Promise<{
    isRepaired: boolean;
    repairedFilepath: string;
    stdout: string;
  }>(async (resolve, reject) => {
    const { filepath: repairedFilepath, isRepaired } = await repairFilename(filepath);
    await fsPromises.unlink(`${repairedFilepath}_exiftool_tmp`).catch(() => {});

    execFile(
      EXIFTOOL_PATH,
      [...args, '-overwrite_original', repairedFilepath],
      (err: unknown, stdout: string, stderr: string) => {
        if (err) {
          console.error('set-exif.ts', err, stderr);
          reject(err);
        }

        resolve({ isRepaired, repairedFilepath, stdout });
      }
    );
  });

  const success = (stdout as string).includes('1 image files updated');

  if (!success) {
    throw new Error(`Failed to set exif: ${stdout}`);
  } else {
    const exif = await getExif(repairedFilepath);

    return { isRepaired, filepath: repairedFilepath, exif };
  }
}
