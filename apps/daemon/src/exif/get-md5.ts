import { EXIFTOOL_PATH } from './data';
import { execFile } from 'child_process';
import fs from 'fs/promises';
import md5File from 'md5-file';

export function getMd5(filepath: string) {
  const tempFilepath = `${filepath}-temp`;

  return new Promise<void>((resolve, reject) => {
    execFile(EXIFTOOL_PATH, [filepath, '-all=', '-o', tempFilepath], (err: unknown, stdout: string, stderr: string) => {
      if (err) {
        console.error(stderr);

        reject(err);
      }

      resolve();
    });
  })
    .then(() => md5File(tempFilepath))
    .then(async (hash) => {
      await fs.unlink(tempFilepath);

      return hash;
    });
}
