export function replaceInvalidFilenameCharacters(filename: string) {
  return filename.replace(/[/\\?%*:|"<>]/g, '_');
}