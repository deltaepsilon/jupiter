import { Directory, DownloadState, FileIndex, FileIndexByFilepath, Tokens, Urls } from 'data/daemon';

import { MediaItem } from 'data/media-items';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { isErrnoException } from './utils';
import path from 'path';

export const DB_FOLDER_NAME = '__f_stop_admin_data';

const SECONDS_MS = 1000;
const CACHE_TTL = SECONDS_MS * 30;
const CACHE_MAX_WRITE_MS = SECONDS_MS * 2;
const DEBUG = false;

export type FilesystemDatabase = Awaited<ReturnType<typeof createFilesystemDatabase>>;

interface MetadataData {
  directory: Directory;
  state: DownloadState;
  tokens: Tokens;
  urls: Urls;
}

interface FolderData {
  ingestedIds: string[];
  mediaItems: Record<string, MediaItem>;
  downloadingIds: string[];
  relativeFilePaths: string[];
  filesIndexByFilename: Record<string, FileIndexByFilepath>;
  files: Record<string, FileIndex>;
  downloadedIds: string[];
}

type Db = ReturnType<typeof createDb>;

export async function createFilesystemDatabase({ directory, libraryId }: { libraryId: string; directory: string }) {
  const libraryPath = path.join(directory, DB_FOLDER_NAME, libraryId);
  const metadataDbPath = path.join(libraryPath, `metadata.json`);
  const folderDbs: Map<string, Db> = new Map();

  await fsPromises.mkdir(libraryPath, { recursive: true });

  function getFolderDb(folder: string): Db {
    const folderSlug = folder.replace(/[\\|\/]/g, '-');
    const dbPath = path.join(directory, DB_FOLDER_NAME, libraryId, `folder-${folderSlug}.json`);
    const cachedDb = folderDbs.get(dbPath);

    if (!cachedDb) {
      const db = createDb<FolderData>(dbPath);

      folderDbs.set(dbPath, db);

      return db;
    } else {
      return cachedDb;
    }
  }

  return {
    isDb: true,
    libraryId,
    metadataDb: createDb<MetadataData>(metadataDbPath),
    getFolderDb,
  };
}

function createDb<DataType>(path: string) {
  let cache: DataType | undefined;
  let writeTimer: NodeJS.Timeout | undefined;
  let cacheTimer: NodeJS.Timeout | undefined;

  function resetCacheTimer() {
    cacheTimer && clearTimeout(cacheTimer);

    cacheTimer = setTimeout(() => {
      cache = undefined;
    }, CACHE_TTL);
  }

  function getCache(): typeof cache {
    if (!cache) {
      cache = readDb(path) as typeof cache;
    }

    return cache;
  }

  async function setCache() {
    resetCacheTimer();
    writeTimer && clearTimeout(writeTimer);

    writeTimer = setTimeout(async () => {
      await writeDb(path, cache || {});
    }, CACHE_MAX_WRITE_MS);
  }

  function get(key: string) {
    const parts = key.split('.');
    const cache = getCache();

    // @ts-ignore
    return parts.reduce((acc, part) => acc && acc[part], cache);
  }

  function set<T>(key: string, value: T) {
    const parts = key.split('.');
    const cache = getCache();

    parts.reduce<typeof cache>((acc, part, index) => {
      if (index === parts.length - 1) {
        // @ts-ignore
        acc[part] = value;
      } else {
        // @ts-ignore
        acc[part] = acc[part] || {};
      }

      // @ts-ignore
      return acc[part];
    }, cache);

    setCache();

    return value;
  }

  function remove(key: string) {
    const parts = key.split('.');
    const cache = getCache();

    parts.reduce<typeof cache>((acc, part, index) => {
      if (index === parts.length - 1) {
        // @ts-ignore
        acc[part] = undefined;
      }

      // @ts-ignore
      return acc[part];
    }, cache);

    setCache();
  }

  return {
    all: getCache,
    set,
    get,
    remove,
  };
}

async function writeDb(path: string, data: Record<string, unknown>) {
  return fsPromises.writeFile(path, JSON.stringify(data, null, DEBUG ? 2 : undefined), { flag: 'w' });
}

function readDb(path: string): Record<string, unknown> | undefined {
  try {
    const value = fs.readFileSync(path, 'utf8');

    return value ? JSON.parse(value) : {};
  } catch (error) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      return {};
    } else {
      throw error;
    }
  }
}
