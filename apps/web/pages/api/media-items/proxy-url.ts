import { NextApiRequest, NextApiResponse } from 'next';

import https from 'https';
import url from 'url';
import { z } from 'zod';

export default async function proxyUrl(req: NextApiRequest, res: NextApiResponse) {
  const requestedUrl = z.string().parse(req.query.url);
  const { protocol, host, path } = url.parse(requestedUrl);
  const options = { protocol, host, path };

  return new Promise((resolve, reject) => {
    req.pipe(
      https.request(options, (response) => {
        response.pipe(res, { end: true });

        response.on('end', resolve);
        response.on('error', reject);
      })
    );
  });
}
