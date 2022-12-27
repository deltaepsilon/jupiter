declare module 'file-system-db' {
  class FSDB {
    constructor(path: string, compact?: boolean);

    delete(key: string): void;
    get<T>(key: string): T;
    set<T>(key: string, value: T): void;
  }

  export default FSDB;
}
