import { NextApiRequest, NextApiResponse } from 'next';

import { ZodError } from 'zod';
import exif from 'exiftool';

export default async function handleExif(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const metadata = await getMetadata(req.body);

      res.json(metadata);
    } else {
      res.send('ok');
    }
  } catch (error) {
    console.error('api/media-items/exif error: ', error?.toString());

    if (error instanceof Error) {
      if (error instanceof ZodError) {
        res.status(422).json(error);
      } else {
        // @ts-ignore
        res.status(error?.response?.status || 500).json(error?.response?.data || { error: error.toString() });
      }
    }
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};

async function getMetadata(buffer: Buffer) {
  console.log('exif: ', Object.keys(exif));

  return new Promise((resolve, reject) => {
    exif.metadata(buffer, (err: unknown, metadata: Record<string, string | number>) => {
      if (err) {
        reject(err);
      } else {
        const formatted = Object.entries(metadata).reduce((acc, [key, value]) => {
          acc[key] = value;

          return acc;
        }, {} as Record<string, string | number>);

        resolve(formatted);
      }
    });
  });
}

async function writeMetadata(buffer: Buffer, metadata: Record<string, string | number>) {
  return new Promise((resolve, reject) => {
    // exif.write(buffer, metadata, (err: unknown, buffer: Buffer) => {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(buffer);
    //   }
    // });
  });
}
