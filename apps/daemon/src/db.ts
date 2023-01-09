import FSDB from 'file-system-db';
import path from 'path';

export const DB_FOLDER_NAME = '__f_stop_admin_data';

export type FilesystemDatabase = ReturnType<typeof createFilesystemDatabase>;

export function createFilesystemDatabase({ directory, libraryId }: { libraryId: string; directory: string }) {
  const metadataFsdb = new FSDB(path.join(directory, DB_FOLDER_NAME, libraryId, `metadata.json`), false);

  testDb(metadataFsdb);

  function getSet(fsdb: FSDB) {
    return function set<T>(key: string, value: T) {
      try {
        fsdb.set(key, value);

        return value;
      } catch (error) {
        console.log('error', error);

        throw error;
      }
    };
  }

  function getGet(fsdb: FSDB) {
    return function get(key: string) {
      try {
        return fsdb.get(key);
      } catch (error) {
        console.log('error asdef', error);
        console.error({ key, fsdb });
        throw error;
      }
    };
  }

  function getRemove(fsdb: FSDB) {
    return function remove(key: string) {
      return fsdb.delete(key);
    };
  }

  function getDb(db: FSDB) {
    return {
      set: getSet(db),
      get: getGet(db),
      remove: getRemove(db),
    };
  }

  function getFolderDb(folder: string) {
    const folderSlug = folder.replace(/[\\|\/]/g, '-');
    const dbPath = path.join(directory, DB_FOLDER_NAME, libraryId, `folder-${folderSlug}.json`);
    const fsdb = new FSDB(dbPath, false);

    testDb(fsdb);

    return getDb(fsdb);
  }

  function testDb(fsdb: FSDB) {
    try {
      fsdb.get('test');
    } catch (error) {
      if (error instanceof Error && error.toString() === 'SyntaxError: Unexpected end of JSON input') {
        fsdb.deleteAll();
      }
    }
  }

  return {
    isDb: true,
    libraryId,
    metadataDb: getDb(metadataFsdb),
    getFolderDb,
  };
}
