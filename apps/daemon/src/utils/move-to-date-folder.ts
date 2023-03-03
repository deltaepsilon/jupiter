import fsPromises from 'fs/promises';
import { getFolderFromDate } from '../utils';
import path from 'path';

export const SEPARATOR = '_____';

export async function moveToDateFolder({
  date,
  directoryPath,
  filepath,
}: {
  date?: Date;
  directoryPath: string;
  filepath: string;
}) {
  const folder = getFolderFromDate(date);
  const yearMonthDirectory = path.join(directoryPath, folder);
  const parsedPath = path.parse(filepath);
  let filename = stripLeadingId(parsedPath.base);
  const isMoved = yearMonthDirectory !== parsedPath.dir || filename !== parsedPath.base;

  if (isMoved) {
    await fsPromises.mkdir(yearMonthDirectory, { recursive: true });

    filename = await getDeDupedFilename(yearMonthDirectory, filename);
  }

  const yearMonthFilepath = path.join(yearMonthDirectory, filename);

  if (isMoved) {
    await fsPromises.rename(filepath, yearMonthFilepath);
  }

  return { isMoved, filename, folder, original: filepath, updated: yearMonthFilepath };
}

const LEADING_ID_REGEXP = new RegExp(`^.+${SEPARATOR}`);

function stripLeadingId(filename: string) {
  return filename.replace(LEADING_ID_REGEXP, '');
}

async function getDeDupedFilename(yearMonthDirectory: string, filename: string) {
  const files = await fsPromises.readdir(yearMonthDirectory);
  const { name: filenameWithoutExtension, ext: extension } = path.parse(filename);
  const regex = new RegExp(`^${filenameWithoutExtension}(-[0-9]+)?${extension}$`);
  const matches = files.filter((file) => regex.test(file));
  const hasPerfectMatch = matches.includes(filename);
  const max = matches.reduce((max, match) => {
    const matchName = path.parse(match).name;
    const matchNameParts = matchName.split('-');
    const matchNumberOrNan = parseInt(matchNameParts[matchNameParts.length - 1], 10);
    const matchNumber = isNaN(matchNumberOrNan) ? 0 : matchNumberOrNan;

    return matchNumber > max ? matchNumber : max;
  }, 0);

  return hasPerfectMatch ? `${filenameWithoutExtension}-${max + 1}${extension}` : filename;
}
