import { CONFIG_PATH, EXIFTOOL_PATH } from './exif/data';
import { getFileTree } from './utils';
import { getExif } from './exif';

import { execFile, spawn, exec, spawnSync } from 'child_process';

import fs from 'fs';
import path from 'path';

export async function debug() {
  const fileTree = await getFileTree('C:\\snapshot');

  console.info('cwd', process.cwd());
  console.info('__dirname', __dirname);
  console.info('fileTree', fileTree);

  // console.info('files', fs.readdirSync('.'));
  // console.info('__downloading', fs.readdirSync('\\\\Stego\\home\\Photos\\small-test\\__downloading'));
  // console.info('vendor', fs.readdirSync(path.join(__dirname, 'vendor')));

  console.info({ CONFIG_PATH, EXIFTOOL_PATH });

  const child = exec(`dir ${process.cwd()}`, (err, stdout, stderr) => {
    console.info({ err, stdout, stderr });
  });

  // child.stdout.on('data', (data) => {
  //   console.info('data', data.toString());
  // });

  const result = await new Promise((resolve, reject) => {
    execFile(
      EXIFTOOL_PATH,
      ['-j', '\\\\Stego\\home\\Photos\\small-test\\__downloading\\test.jpg'],
      (err: unknown, stdout: string, stderr: string) => {
        if (err) {
          console.info(err);
          reject(err);
        }

        resolve(stdout);
      }
    );
  });

  console.info('result', result);
  // const exif = await getExif('C:\\snapshot\\daemon\\vendor\\test.jpg');

  // console.info('exif', exif);
}
