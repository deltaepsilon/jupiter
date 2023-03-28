import { Directory, DownloadState, FileIndex, FileIndexByFilepath, Tokens, Urls } from 'data/daemon';
import { Level, ValueIterator, ValueIteratorOptions } from 'level';

import { AbstractSublevel } from 'abstract-level';
import { MediaItem } from 'data/media-items';
import path from 'path';
import { z } from 'zod';

export const DB_FOLDER_NAME = '__data';

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

type Db = ReturnType<typeof wrapDb>;

export type LevelDatabase = {
  isDb: boolean;
  libraryId: string;
  metadataDb: Db;
  getFolderDb: (folder: string, suffix?: string) => Db;
};

type FolderSublevel = AbstractSublevel<Level<string, MetadataData>, string | Buffer | Uint8Array, string, any>;

let existingDb: Level<string, any> | null = null;

export async function createLevelDatabase({ directory, libraryId }: { libraryId: string; directory: string }) {
  const libraryPath = path.join(directory, DB_FOLDER_NAME, libraryId);
  const folderDbs: Map<string, Db> = new Map();

  if (existingDb) {
    console.info('🤖 Closing existing database...');
    await existingDb.close();
  }

  const metadataDb = new Level<string, any>(libraryPath, { valueEncoding: 'json' });

  existingDb = metadataDb;

  function getFolderDb(folder: string, suffix: string = '') {
    const folderSlug = folder.replace(/[\\|\/]/g, '-');
    const combinedSlug = suffix ? `${folderSlug}_${suffix}` : folderSlug;
    const cachedDb = folderDbs.get(combinedSlug);

    if (!cachedDb) {
      const folderDb = wrapDb(metadataDb.sublevel<string, any>(combinedSlug, { valueEncoding: 'json' }));

      folderDbs.set(combinedSlug, folderDb);

      return folderDb;
    } else {
      return cachedDb;
    }
  }

  let isClosing = false;
  async function openDatabase() {
    if (isClosing) {
      return Promise.reject(new Error('Database is closing.'));
    }

    return new Promise<LevelDatabase>((resolve, reject) => {
      metadataDb.open((error) => {
        console.info('🤖 Database status:', metadataDb.status);

        async function handleClose(signal: string) {
          const isCleanExit = new Set(['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGUSR1', 'SIGUSR2']).has(signal);

          console.info('🤖 Closing database...');
          await metadataDb.close();
          console.info('🤖 Database status:', metadataDb.status);

          if (isCleanExit) {
            process.exit(0);
          } else {
            console.error(signal);
            process.exit(1);
          }
        }

        process.on('SIGTERM', handleClose);
        process.on('SIGINT', handleClose);
        process.on('exit', handleClose);
        process.on('restart', handleClose);
        process.on('uncaughtException', handleClose);

        if (error) {
          // @ts-ignore
          if (error.code === 'LEVEL_LOCKED') {
            console.info('Database locked!');
          }
          reject(error);
        } else {
          resolve({
            isDb: true,
            libraryId,
            metadataDb: wrapDb(metadataDb),
            getFolderDb,
          });
        }
      });
    });
  }

  return openDatabase();
}

function wrapDb(level: Level<string, any> | FolderSublevel) {
  return {
    get: async function get<ReturnValue>(
      key: string,
      schema: z.ZodTypeAny,
      defaultValue: any = undefined
    ): Promise<ReturnValue> {
      try {
        const value = await level.get(key);

        return schema.parse(value);
      } catch (error) {
        return schema.parse(defaultValue);
      }
    },
    put: async (key: string, value: any) => {
      try {
        return level.put(key, value);
      } catch (error) {
        console.error('level.put error', key, value, error);

        return null;
      }
    },
    del: async (key: string) => {
      try {
        return level.del(key);
      } catch (error) {
        console.error('level.del error', key, error);

        return null;
      }
    },
    getMany: level.getMany.bind(level),
    values: level.values.bind(level),
    iterator: level.iterator.bind(level),
  };
}
