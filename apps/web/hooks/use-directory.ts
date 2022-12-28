import { DirectoryAction, MessageType, listDirectoriesData, setDirectoryData } from 'data/daemon';

import { DaemonRecordKey } from 'data/daemon';
import produce from 'immer';
import { useCallback } from 'react';
import { useDaemon } from 'web/contexts';
import { useDaemonRecord } from 'web/hooks';

export type UseDirectoryResult = ReturnType<typeof useDirectory>;

export function useDirectory(libraryId: string) {
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
  const directory = daemonRecord?.directory;

  console.log('useDirectory', directory);

  return { directory, isConnected, listDirectories, setDirectory };
}
