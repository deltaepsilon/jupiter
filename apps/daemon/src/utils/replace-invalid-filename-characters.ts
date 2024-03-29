const MAX_FILENAME_LENGTH = 50;

export function replaceInvalidFilenameCharacters(filename: string) {
  return filename.replace(/[^\w.-]/g, '_').slice(-1 * MAX_FILENAME_LENGTH);
}
