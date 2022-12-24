import FSDB from 'file-system-db';
import path from 'path';

export type FilesystemDatabase = ReturnType<typeof createFilesystemDatabase>;

export function createFilesystemDatabase({ directory, libraryId }: { libraryId: string; directory: string }) {
  const dbPath = path.join(directory, '__f_stop_admin_data', `library-${libraryId}.json`);
  const fsdb = new FSDB(dbPath, false);

  function set(key: string, value: any) {
    fsdb.set(key, value);
  }

  function get(key: string) {
    return fsdb.get(key);
  }

  return { isDb: true, set, get };
}
