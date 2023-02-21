import axios from 'axios';
import { IS_DEVELOPMENT } from 'data/daemon';
import path from 'path';
import fsPromises from 'fs/promises';
import { z } from 'zod';

const DIST_SCHEMA = z.object({ md5: z.string(), date: z.string(), url: z.string() });

export async function versionCheck() {
  if (IS_DEVELOPMENT) {
    console.info('⚠️ Development mode');

    return true;
  } else {
    const dist = await getDistJson();
    const response = await axios.get(dist.url);
    const serverDist = DIST_SCHEMA.parse(response.data);
    const isMatch = serverDist.md5 === dist.md5;

    if (!isMatch) {
      console.info(`\n\ncurrent version: ${dist.date}`);
      console.info(`latest version: ${serverDist.date}\n\n`);
    }

    return isMatch;
  }
}

async function getDistJson() {
  const file = path.join(__dirname, 'dist.json');
  const fileContents = await fsPromises.readFile(file, 'utf-8');

  return DIST_SCHEMA.parse(JSON.parse(fileContents));
}
