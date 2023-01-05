import fsPromises from 'fs/promises';
import { getFolderFromDate } from '../utils';
import path from 'path';

export async function moveToDateFolder({
  date,
  directoryPath,
  filepath,
}: {
  date?: Date;
  directoryPath: string;
  filepath: string;
}) {
  const currentPath = path.parse(filepath);
  const folder = getFolderFromDate(date);
  const yearMonthDirectory = path.join(directoryPath, folder);
  const yearMonthFilepath = path.join(yearMonthDirectory, currentPath.base);
  const isMoved = yearMonthDirectory !== currentPath.dir;

  if (isMoved) {
    await fsPromises.mkdir(yearMonthDirectory, { recursive: true });
    await fsPromises.rename(filepath, yearMonthFilepath);
  }

  return { isMoved, filename: currentPath.base, folder, original: filepath, updated: yearMonthFilepath };
}
