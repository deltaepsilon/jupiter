declare module 'file-system-db' {
  class FSDB {
    constructor(path: string, compact?: boolean);

    set<T>(key: string, value: T): void;
    get<T>(key: string): T;
  }

  export default FSDB;
}
