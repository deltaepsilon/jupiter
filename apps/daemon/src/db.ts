import FSDB from 'file-system-db';
import path from 'path';

export const DB_FOLDER_NAME = '__f_stop_admin_data';

export type FilesystemDatabase = ReturnType<typeof createFilesystemDatabase>;

export function createFilesystemDatabase({ directory, libraryId }: { libraryId: string; directory: string }) {
  const metadataFsdb = new FSDB(path.join(directory, DB_FOLDER_NAME, libraryId, `metadata.json`), false);

  testDb(metadataFsdb);

  function getAll(fsdb: FSDB) {
    return function all() {
      return fsdb.all();
    };
  }

  function getSet(fsdb: FSDB) {
    return function set<T>(key: string, value: T) {
      fsdb.set(key, value);

      return value;
    };
  }

  function getGet(fsdb: FSDB) {
    return function get(key: string) {
      return fsdb.get(key);
    };
  }

  function getRemove(fsdb: FSDB) {
    return function remove(key: string) {
      return fsdb.delete(key);
    };
  }

  function getDb(db: FSDB) {
    return {
      all: getAll(db),
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
