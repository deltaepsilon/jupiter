import { MessageType, ProgressMessageData, progressMessageDataSchema } from 'data/daemon';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { useDaemon } from './daemon-context';

export type ProgressMap = Record<string, ProgressMessageData>;
type ProgressMapByFolder = Record<string, ProgressMap>;
export function getDefaultProgressMap() {
  return {} as ProgressMap;
}

interface FolderProgressContextValue {
  emptyFolderProgress: () => void;
  progressMapsByFolder: ProgressMapByFolder;
}
const FolderProgressContext = createContext<FolderProgressContextValue>({
  emptyFolderProgress: () => {},
  progressMapsByFolder: {},
});

export function useFolderProgress() {
  return useContext(FolderProgressContext);
}

export function FolderProgressProvider({ children }: { children: React.ReactNode }) {
  const progressMapsRef = useRef<ProgressMapByFolder>({});
  const [progressMapsByFolder, setProgressMapsByFolder] = useState<ProgressMapByFolder>({});
  const { registerHandler } = useDaemon();
  const emptyFolderProgress = useCallback(() => {
    progressMapsRef.current = {};
    setProgressMapsByFolder({});
  }, []);

  useEffect(
    () =>
      registerHandler({
        type: MessageType.progress,
        handler: (message) => {
          const data = progressMessageDataSchema.parse(message.payload?.data);
          const existing = progressMapsByFolder[data.folder] ?? getDefaultProgressMap();

          if (data.progressEvent.progress === 1) {
            delete existing[data.id];
          } else {
            existing[data.id] = data;
          }

          progressMapsRef.current = { ...progressMapsByFolder, [data.folder]: existing };
        },
      }),
    [progressMapsByFolder, registerHandler]
  );

  useEffect(() => {
    const timer = setInterval(() => setProgressMapsByFolder(progressMapsRef.current), 1000);

    return () => clearInterval(timer);
  }, [setProgressMapsByFolder]);

  return (
    <FolderProgressContext.Provider value={{ emptyFolderProgress, progressMapsByFolder }}>
      {children}
    </FolderProgressContext.Provider>
  );
}
