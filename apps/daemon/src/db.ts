import FSDB from 'file-system-db';
import path from 'path';

export type FilesystemDatabase = ReturnType<typeof createFilesystemDatabase>;

export function createFilesystemDatabase({ directory, libraryId }: { libraryId: string; directory: string }) {
  const dbPath = path.join(directory, '__f_stop_admin_data', `library-${libraryId}.json`);
  const fsdb = new FSDB(dbPath, false);

  function set<T>(key: string, value: T) {
    fsdb.set(key, value);

    return value;
  }

  function get(key: string) {
    return fsdb.get(key);
  }

  function remove(key: string) {
    return fsdb.delete(key);
  }

  return { isDb: true, set, get, remove };
}
