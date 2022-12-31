import FSDB from 'file-system-db';
import path from 'path';

export const DB_FOLDER_NAME = '__f_stop_admin_data';

export type FilesystemDatabase = ReturnType<typeof createFilesystemDatabase>;

export function createFilesystemDatabase({ directory, libraryId }: { libraryId: string; directory: string }) {
  const metadataDb = new FSDB(path.join(directory, DB_FOLDER_NAME, `library-${libraryId}-metadata.json`), false);
  const downloadedItemsDb = new FSDB(
    path.join(directory, DB_FOLDER_NAME, `library-${libraryId}-downloaded-items.json`),
    false
  );
  const ingestedItemsDb = new FSDB(
    path.join(directory, DB_FOLDER_NAME, `library-${libraryId}-ingested-items.json`),
    false
  );
  const mediaItemsDb = new FSDB(path.join(directory, DB_FOLDER_NAME, `library-${libraryId}-media-items.json`), false);
  const fileIndexDb = new FSDB(path.join(directory, DB_FOLDER_NAME, `library-${libraryId}-file-index.json`), false);

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
      set: getSet(db),
      get: getGet(db),
      remove: getRemove(db),
    };
  }

  return {
    isDb: true,
    libraryId,
    metadataDb: getDb(metadataDb),
    downloadedItemsDb: getDb(downloadedItemsDb),
    ingestedItemsDb: getDb(ingestedItemsDb),
    mediaItemsDb: getDb(mediaItemsDb),
    fileIndexDb: getDb(fileIndexDb),
  };
}
