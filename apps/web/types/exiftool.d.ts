declare module 'exiftool' {
  function metadata(buffer: Buffer, callback: (err: unknown, metadata: Record<string, string | number>) => void): void;
}
