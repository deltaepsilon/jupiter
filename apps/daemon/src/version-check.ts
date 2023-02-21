import axios from 'axios';
import path from 'path';
import fsPromises from 'fs/promises';
import { z } from 'zod';

const DIST_SCHEMA = z.object({ md5: z.string(), date: z.string(), url: z.string() });

export async function versionCheck() {
  const json = await getDistJson();

  console.log(json);
  return false;
}

async function getDistJson() {
  const file = path.join(__dirname, 'dist.json');
  const fileContents = await fsPromises.readFile(file, 'utf-8');

  return DIST_SCHEMA.parse(JSON.parse(fileContents));
}
