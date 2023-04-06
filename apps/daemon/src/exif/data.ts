import path from 'path';

const isWindows = process.platform === 'win32';
const isMacOS = process.platform === 'darwin';
// MacOS file launch writes __filename to _ and drops cwd
const CWD = isMacOS && process.env._ ? path.dirname(process.env._) : process.cwd();

export const EXIFTOOL_PATH = isWindows
  ? path.join(CWD, 'vendor', 'exiftool-12.55', 'exiftool.exe')
  : path.join(CWD, 'vendor', 'Image-ExifTool-12.55', 'exiftool');

export const CONFIG_PATH = path.join(CWD, 'vendor', 'custom.cfg');
