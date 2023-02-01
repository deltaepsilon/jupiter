import { CONFIG_PATH, EXIFTOOL_PATH } from './data';
import { Exif, exifSchema } from 'data/daemon';

import { execFile } from 'child_process';
import fsPromises from 'fs/promises';
import { getExif } from './get-exif';

export function setExif(filepath: string, exif: Partial<Exif>) {
  const args = Object.entries(exif).reduce(
    (acc, [key, value]) => {
      acc.push(`-${key}=${value}`);

      return acc;
    },
    ['-config', CONFIG_PATH] as string[]
  );

  return new Promise(async (resolve, reject) => {
    await fsPromises.unlink(`${filepath}_exiftool_tmp`).catch(() => {});

    execFile(
      EXIFTOOL_PATH,
      [...args, '-overwrite_original', filepath],
      (err: unknown, stdout: string, stderr: string) => {
        if (err) {
          console.error('set-exif.ts', stderr);
          reject(err);
        }

        resolve(stdout);
      }
    );
  }).then((stdout) => {
    const success = (stdout as string).includes('1 image files updated');

    if (!success) {
      throw new Error(`Failed to set exif: ${stdout}`);
    } else {
      return getExif(filepath);
    }
  });
}
