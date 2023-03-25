import fsPromises from 'fs/promises';
import { Exif } from 'data/daemon';
import { getExif } from './get-exif';

export async function repairFilename(filepath: string, existingExif?: Exif) {
  const exif = existingExif || (await getExif(filepath));
  const filenameParts = filepath.split('.').slice(0, -1);
  let repairedFilepath = [...filenameParts, exif.FileTypeExtension].join('.');
  const filepathNeedsRepair = repairedFilepath.toLowerCase() !== filepath.toLowerCase();

  if (filepathNeedsRepair) {
    repairedFilepath = `${filepath}.${exif.FileTypeExtension}`; // Looks like is-bad-extension.png.jpg

    await fsPromises.rename(filepath, repairedFilepath);

    return { filepath: repairedFilepath, isRepaired: true };
  } else {
    return { filepath, isRepaired: false };
  }
}
