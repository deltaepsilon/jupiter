import FSDB from 'file-system-db';
import path from 'path';

export const DB_FOLDER_NAME = '__f_stop_admin_data';

export type FilesystemDatabase = ReturnType<typeof createFilesystemDatabase>;

export function createFilesystemDatabase({ directory, libraryId }: { libraryId: string; directory: string }) {
  const metadataDb = new FSDB(path.join(directory, DB_FOLDER_NAME, libraryId, `metadata.json`), false);

  function getSet(fsdb: FSDB) {
    return function set<T>(key: string, value: T) {
      fsdb.set(key, value);

      return value;
    };
  }

  function getGet(fsdb: FSDB) {
    return function get(key: string) {
      try {
        return fsdb.get(key);
      } catch (error) {
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

    return getDb(new FSDB(dbPath, false));
  }

  return {
    isDb: true,
    libraryId,
    metadataDb: getDb(metadataDb),
    getFolderDb,
  };
}
