import { EXIFTOOL_PATH } from './data';
import { execFile } from 'child_process';
import fsPromises from 'fs/promises';
import { getExif } from './get-exif';
import md5File from 'md5-file';

export async function getMd5(filepath: string) {
  const exif = await getExif(filepath);
  const filenameParts = filepath.split('.').slice(0, -1);
  const repairedFilepath = [...filenameParts, exif.FileTypeExtension].join('.');
  const tempFilepath = `${repairedFilepath}-temp`;
  const filepathNeedsRepair = repairedFilepath !== filepath;

  if (filepathNeedsRepair) {
    await fsPromises.rename(filepath, repairedFilepath);
  }

  return new Promise<void>((resolve, reject) => {
    execFile(
      EXIFTOOL_PATH,
      [repairedFilepath, '-all=', '-o', tempFilepath],
      (err: unknown, stdout: string, stderr: string) => {
        if (err) {
          console.error(stderr);

          reject(err);
        }

        resolve();
      }
    );
  })
    .then(() => md5File(tempFilepath))
    .then(async (hash) => {
      await fsPromises.unlink(tempFilepath);

      return { hash, filepath: repairedFilepath, isRepaired: filepathNeedsRepair };
    });
}
