import path from 'path';

const isWindows = process.platform === 'win32';

export const EXIFTOOL_PATH = isWindows ? path.join('vendor', 'exiftool.exe') : path.join('vendor', 'exiftool');

export const CONFIG_PATH = path.join(__dirname, 'vendor', 'custom.cfg');
