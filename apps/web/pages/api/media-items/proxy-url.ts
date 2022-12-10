import { NextApiRequest, NextApiResponse } from 'next';

import { Duplex } from 'stream';
import format from 'date-fns/format';
import fs from 'fs';
import { https } from 'follow-redirects';
import { mediaItemSchema } from 'data/media-items';
import { spawn } from 'child_process';
import { temporaryFile } from 'tempy';
import url from 'url';
import { z } from 'zod';

const PAYLOAD_SCHEMA = z.object({ mediaItem: mediaItemSchema });

export default async function proxyUrl(req: NextApiRequest, res: NextApiResponse) {
  const payload = Buffer.from(req.query.payload as string, 'base64').toString('utf-8');
  const { mediaItem } = PAYLOAD_SCHEMA.parse(JSON.parse(payload));
  const { baseUrl, filename, mediaMetadata, mimeType } = mediaItem;
  const isVideo = mimeType.includes('video');
  const requestedUrl = isVideo ? `${baseUrl}=dv` : `${baseUrl}=d`;
  const { protocol, host, path } = url.parse(requestedUrl);
  const options = { protocol, host, path, followAllRedirects: true };
  const duplexStream = getDuplexStream({ date: new Date(mediaMetadata.creationTime), filename });

  console.log('proxyUrl: ', requestedUrl);

  return new Promise((resolve, reject) => {
    req.pipe(
      https.request(options, (response) => {
        response.pipe(duplexStream).pipe(res);

        response.on('end', resolve);
        response.on('error', reject);
      })
    );
  });
}

export const config = {
  api: {
    responseLimit: false,
  },
};

const BYTES_TO_WRITE = 1024 * 128;
function getDuplexStream({ date, filename }: { date: Date; filename: string }) {
  const tempFile = temporaryFile({ name: filename });
  const writeStream = fs.createWriteStream(tempFile);
  const dateString = format(date, 'yyyy:MM:dd HH:mm:ss');
  let readStream: fs.ReadStream;
  let isExifWritten = false;
  let bytesWritten = 0;

  writeStream.on('open', () => {
    readStream = fs.createReadStream(tempFile);
  });

  async function writeExif() {
    return new Promise((resolve, reject) => {
      const process = spawn('sh', [
        '-c',
        `cat ${tempFile} | exiftool -AllDates="${dateString}" - | > ${tempFile}_temp`,
      ]);

      process.stdout.on('data', (data) => {
        console.log('exiftool stdout: ', data, data.toString());
      });

      process.on('exit', (code, signal) => {
        console.log('exiftool exited with code: ', code, signal);

        resolve(true);
      });

      process.on('error', reject);
    });
  }

  console.log('tempFile: ', tempFile);
  console.log('dateString: ', dateString);

  const duplex = new Duplex({
    final(callback) {
      console.log('final');
      isExifWritten
        ? callback()
        : writeExif().then(() => {
            this.push(readStream.read());

            callback();
          });
    },
    write(chunk, encoding, next) {
      writeStream.write(chunk, () => {
        bytesWritten += chunk.length;

        if (bytesWritten >= BYTES_TO_WRITE && !isExifWritten) {
          isExifWritten = true;

          writeExif().then(() => {
            console.log('exif written');
            // next();
          });
        } else {
          next();
        }
      });
    },
    read() {
      if (readStream) {
        const chunk = readStream.read();

        console.log('read chunk: ', chunk?.length);

        this.push(chunk);
      }
    },
  });

  duplex.on('end', () => {});

  return duplex;
}
