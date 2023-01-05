import { Exif, exifSchema } from 'data/daemon';

import { EXIFTOOL_PATH } from './data';
import { execFile } from 'child_process';
import { getExif } from './get-exif';

export function setExif(filepath: string, exif: Partial<Exif>) {
  const args = Object.entries(exif).reduce((acc, [key, value]) => {
    acc.push(`-${key}="${value}"`);

    return acc;
  }, [] as string[]);

  return new Promise((resolve, reject) => {
    execFile(
      EXIFTOOL_PATH,
      [...args, '-overwrite_original', filepath],
      (err: unknown, stdout: string, stderr: string) => {
        if (err) {
          console.error(stderr);
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
