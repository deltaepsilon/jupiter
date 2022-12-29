import {
  DaemonMessage,
  DirectoryAction,
  MessageType,
  daemonMessage,
  listDirectoriesData,
  setDirectoryData,
} from 'data/daemon';
import { createContext, useContext } from 'react';

import { DaemonRecordKey } from 'data/daemon';
import produce from 'immer';
import { useCallback } from 'react';
import { useDaemon } from 'web/contexts';
import { useDaemonRecord } from 'web/hooks';

export interface UseDirectoryResult {
  directory?: string;
  isConnected: boolean;
  listDirectories: (data: unknown) => Promise<DaemonMessage>;
  setDirectory: (directory: string) => Promise<DaemonMessage>;
}

export const DirectoryContext = createContext<UseDirectoryResult>({
  isConnected: false,
  listDirectories: async () =>
    daemonMessage.parse({ type: MessageType.directory, payload: { action: DirectoryAction.list } }),
  setDirectory: async () =>
    daemonMessage.parse({ type: MessageType.directory, payload: { action: DirectoryAction.set } }),
});

export function useDirectory() {
  return useContext(DirectoryContext);
}

export function DirectoryProvider({ children, libraryId }: { children: React.ReactNode; libraryId: string }) {
  const { daemonRecord, updateRecord } = useDaemonRecord(libraryId);
  const { send, isConnected } = useDaemon();
  const listDirectories = useCallback(
    async (data: unknown) => {
      const parsedData = listDirectoriesData.parse(data);
      const result = await send({
        type: MessageType.directory,
        payload: {
          action: DirectoryAction.list,
          text: parsedData.navigate ? `Navigating: ${parsedData.navigate}` : `Listing: ${parsedData.currentDirectory}`,
          data: parsedData,
        },
      });

      const parsed = listDirectoriesData.safeParse(result.payload.data);
      if (parsed.success) {
        return produce(result, (draft) => {
          draft.payload.data = parsed.data;
        });
      } else {
        return result;
      }
    },
    [send]
  );
  const setDirectory = useCallback(
    async (directory: string) => {
      const parsedData = setDirectoryData.parse({ directory, libraryId });
      const result = await send({
        type: MessageType.directory,
        payload: {
          action: DirectoryAction.set,
          text: `Setting: ${parsedData.directory}`,
          data: parsedData,
        },
      });

      await updateRecord({
        [DaemonRecordKey.directory]: directory,
        [DaemonRecordKey.updated]: new Date(),
      });

      const parsed = setDirectoryData.safeParse(result.payload.data);

      if (parsed.success) {
        return produce(result, (draft) => {
          draft.payload.data = parsed.data;
        });
      } else {
        return result;
      }
    },
    [libraryId, send, updateRecord]
  );
  const value = { directory: daemonRecord?.directory, isConnected, listDirectories, setDirectory };

  return <DirectoryContext.Provider value={value}>{children}</DirectoryContext.Provider>;
}
