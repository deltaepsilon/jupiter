const DAEMON_FILEPATH_PARTS = [
  'quiver-photos-windows-',
  'quiver-photos-linux-',
  'quiver-photos-macos-',
  'vendor/',
  'readme',
  'daemon-linux-',
  'daemon-macos-',
  'daemon-windows-',
  '__data',
  '__downloading'
];

export function removeDaemonFilepaths(filepaths: string[]): string[] {
  return filepaths.filter((filepath) => !DAEMON_FILEPATH_PARTS.some((path) => filepath.includes(path)));
}
