import { CONFIG_PATH, EXIFTOOL_PATH } from './data';

import { Exif } from 'data/daemon';
import { execFile } from 'child_process';
import fsPromises from 'fs/promises';
import { getExif } from './get-exif';
import { repairFilename } from './repair-filename';

export type SetExifError = {
  error: string;
  filepath: string;
};

export async function setExif(filepath: string, exif: Partial<Exif>) {
  const args = Object.entries(exif).reduce(
    (acc, [key, value]) => {
      acc.push(`-${key}=${value}`);

      return acc;
    },
    ['-config', CONFIG_PATH, '-ignoreMinorErrors'] as string[]
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
          console.info('set-exif.ts', { EXIFTOOL_PATH, stderr, err });
          reject({ error: stderr || err, filepath: repairedFilepath });
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
