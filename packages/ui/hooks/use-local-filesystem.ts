import { useCallback, useEffect, useRef, useState } from 'react';

import { localforage } from 'ui/utils';

export type DirectoryHandle = FileSystemDirectoryHandle | null;
export type DirectoryHandleMap = Map<string, DirectoryHandle>;

export function useLocalFilesystem(directoryHandleKey: string) {
  const isLoadingRef = useRef(false);
  const [fileHandles, setFileHandles] = useState<FileSystemFileHandle[] | null>(null);
  const [directoryHandle, setDirectoryHandle] = useState<DirectoryHandle>(null);

  const getFileHandles = useCallback(async () => {
    const handles = await window.showOpenFilePicker();

    setFileHandles(() => handles);
  }, []);

  const getDirectoryHandle = useCallback(async () => {
    const handle = await window.showDirectoryPicker({ mode: 'readwrite' });

    setDirectoryHandle(handle);
    localforage.setDirectoryHandle(directoryHandleKey, handle);
  }, [directoryHandleKey]);

  useEffect(() => {
    if (directoryHandleKey && !isLoadingRef.current) {
      isLoadingRef.current = true;

      localforage.getDirectoryHandle(directoryHandleKey).then(async (directoryHandle) => {
        const permission = await directoryHandle?.queryPermission({ mode: 'readwrite' });

        if (isGranted(permission)) {
          setDirectoryHandle(directoryHandle);
        } else {
          const permissionResult = await directoryHandle?.requestPermission({ mode: 'readwrite' });

          if (isGranted(permissionResult)) {
            setDirectoryHandle(directoryHandle);
          }
        }

        isLoadingRef.current = false;
      });
    }
  }, [directoryHandleKey]);

  return { directoryHandle, fileHandles, getDirectoryHandle, getFileHandles };
}

function isGranted(permission: PermissionState | undefined) {
  return permission === 'granted';
}
