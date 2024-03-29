const BAD_FILEPATH_PARTS = [
  'quiver-photos-windows-',
  'quiver-photos-linux-',
  'quiver-photos-macos-',
  'vendor/',
  'daemon',
  'readme',
  '__data',
  '__downloading',
  'syno',
  '.txt',
];

export function removeIrrelevantFilepaths(filepaths: string[]): string[] {
  return filepaths.filter((filepath) => !BAD_FILEPATH_PARTS.some((path) => filepath.toLowerCase().includes(path)));
}
