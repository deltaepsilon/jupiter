import { FileIndex, FolderAction, FolderData, MessageType, folderDataSchema } from 'data/daemon';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { useDaemon } from 'web/contexts';

type MediaItemIdToMd5 = Record<string, string>;
type GetFileFromMediaItemId = (id: string) => FileIndex | undefined;

export interface FolderDataValue {
  folderData: FolderData;
  getFileFromMediaItemId: GetFileFromMediaItemId;
}

const DEFAULT_FOLDER_DATA = folderDataSchema.parse(undefined);

const FolderDataContext = createContext<FolderDataValue>({
  folderData: DEFAULT_FOLDER_DATA,
  getFileFromMediaItemId: () => undefined,
} as FolderDataValue);

export function useFolderData() {
  return useContext(FolderDataContext);
}

interface Props {
  children: React.ReactNode;
  folder: string;
}

export function FolderDataProvider({ children, folder }: Props) {
  const [folderData, setFolderData] = useState<FolderData>(DEFAULT_FOLDER_DATA);
  const [mediaItemIdToMd5, setMediaItemIdToMd5] = useState<MediaItemIdToMd5>({});
  const { send } = useDaemon();
  const getFileFromMediaItemId = useCallback(
    (id: string) => {
      const md5 = mediaItemIdToMd5[id];

      return folderData.files[md5];
    },
    [folderData.files, mediaItemIdToMd5]
  );

  useEffect(() => {
    const mediaItemIdToMd5 = Object.values(folderData.files).reduce<MediaItemIdToMd5>((acc, file) => {
      if (file.mediaItemId) {
        acc[file.mediaItemId] = file.md5;
      }

      return acc;
    }, {});

    setMediaItemIdToMd5(mediaItemIdToMd5);
  }, [folderData]);

  useEffect(() => {
    send({ type: MessageType.folder, payload: { action: FolderAction.get, data: { folder } } }).then((message) =>
      setFolderData(folderDataSchema.parse(message.payload.data.folderData))
    );
  }, [folder, send]);

  return (
    <FolderDataContext.Provider value={{ folderData, getFileFromMediaItemId }}>{children}</FolderDataContext.Provider>
  );
}
