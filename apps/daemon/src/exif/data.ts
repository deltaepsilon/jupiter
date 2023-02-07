import path from 'path';

const isWindows = process.platform === 'win32';

export const EXIFTOOL_PATH = isWindows
  ? path.join('vendor', 'exiftool-12.55', 'exiftool.exe')
  : path.join('vendor', 'Image-ExifTool-12.55', 'exiftool');

export const CONFIG_PATH = path.join(__dirname, 'vendor', 'custom.cfg');
