import { useCallback, useEffect, useState } from 'react';

export function useLocalFilesystem() {
  const [fileHandles, setFileHandles] = useState<FileSystemFileHandle[] | null>(null);
  const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);

  const getFileHandles = useCallback(async () => {
    const handles = await window.showOpenFilePicker();

    setFileHandles(() => handles);
  }, []);

  const getDirectoryHandle = useCallback(async () => {
    const handle = await window.showDirectoryPicker({ mode: 'readwrite' });

    setDirectoryHandle(handle);
  }, []);

  return { directoryHandle, fileHandles, getDirectoryHandle, getFileHandles };
}
