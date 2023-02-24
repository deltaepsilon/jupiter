import path from 'path';

const isWindows = process.platform === 'win32';

export const EXIFTOOL_PATH = isWindows
  ? path.join(process.cwd(), 'vendor', 'exiftool-12.55', 'exiftool.exe')
  : path.join(process.cwd(), 'vendor', 'Image-ExifTool-12.55', 'exiftool');

export const CONFIG_PATH = path.join(process.cwd(), 'vendor', 'custom.cfg');
