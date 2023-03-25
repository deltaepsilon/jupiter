import { Directory, DownloadState, FileIndex, FileIndexByFilepath, Tokens, Urls } from 'data/daemon';

import { AbstractSublevel } from 'abstract-level';
import { Level } from 'level';
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
  getFolderDb: (folder: string) => Db;
};

type FolderSublevel = AbstractSublevel<Level<string, MetadataData>, string | Buffer | Uint8Array, string, any>;

export async function createLevelDatabase({ directory, libraryId }: { libraryId: string; directory: string }) {
  const libraryPath = path.join(directory, DB_FOLDER_NAME, libraryId);
  // const libraryPath = path.join(__dirname, 'db');
  const metadataDb = new Level<string, any>(libraryPath, { valueEncoding: 'json' });
  const folderDbs: Map<string, Db> = new Map();

  function getFolderDb(folder: string) {
    const folderSlug = folder.replace(/[\\|\/]/g, '-');
    const cachedDb = folderDbs.get(folderSlug);

    if (!cachedDb) {
      const folderDb = wrapDb(metadataDb.sublevel<string, any>(folderSlug, { valueEncoding: 'json' }));

      folderDbs.set(folderSlug, folderDb);

      return folderDb;
    } else {
      return cachedDb;
    }
  }

  async function openDatabase() {
    return new Promise<LevelDatabase>((resolve, reject) => {
      metadataDb.open((error) => {
        console.info('Database status:', metadataDb.status);

        process.on('exit', () => {
          console.info(`Process exiting. Database is ${metadataDb.status}.`);
          metadataDb.close(() => {
            console.info(`Database status: ${metadataDb.status}`);
          });
        });

        if (error) {
          console.log('error opening db', Object.keys(error), error);

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
        return await level.put(key, value);
      } catch (error) {
        console.error('level.put error', key, value, error);

        return null;
      }
    },
    del: async (key: string) => {
      try {
        return await level.del(key);
      } catch (error) {
        console.error('level.del error', key, error);

        return null;
      }
    },
    getMany: async (keys: string[]) => {
      try {
        return await level.getMany(keys);
      } catch (error) {
        console.error('level.getMany error', keys, error);

        return [];
      }
    },
  };
}
