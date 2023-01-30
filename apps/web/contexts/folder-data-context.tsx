import { FolderAction, FolderData, MessageType, folderDataSchema } from 'data/daemon';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { useDaemon } from 'web/contexts';

interface FolderDataValue {
  folderData: FolderData;
}

const DEFAULT_FOLDER_DATA = folderDataSchema.parse(undefined);

const FolderDataContext = createContext<FolderDataValue>({
  folderData: DEFAULT_FOLDER_DATA,
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
  const { send } = useDaemon();

  useEffect(() => {
    send({ type: MessageType.folder, payload: { action: FolderAction.get, data: { folder } } }).then((message) =>
      setFolderData(folderDataSchema.parse(message.payload.data.folderData))
    );
  }, [folder, send]);

  return <FolderDataContext.Provider value={{ folderData }}>{children}</FolderDataContext.Provider>;
}
