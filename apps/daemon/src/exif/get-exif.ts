import { EXIFTOOL_PATH } from './data';
import { execFile } from 'child_process';
import { exifSchema } from 'data/daemon';

export function getExif(filepath: string) {
  return new Promise((resolve, reject) => {
    execFile(EXIFTOOL_PATH, ['-j', filepath], (err: unknown, stdout: string, stderr: string) => {
      if (err) {
        console.error(stderr);
        reject(err);
      }

      resolve(stdout);
    });
  }).then((stdout) => {
    const [json] = JSON.parse(stdout as string);

    return exifSchema.parse(json);
  });
}
