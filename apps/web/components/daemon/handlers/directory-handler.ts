import { DaemonMessage, DaemonRecord, DirectoryAction, MessageType, setDirectoryData } from 'data/daemon';

import { Respond } from 'web/contexts';

export function getDirectoryHandler(libraryId: string, daemonRecord: DaemonRecord) {
  const data = setDirectoryData.parse({ directory: daemonRecord.directory, libraryId });

  return (message: DaemonMessage, respond: Respond) => {
    const isRequest = message.payload.action === DirectoryAction.request;

    isRequest &&
      respond({
        type: MessageType.directory,
        payload: {
          action: DirectoryAction.set,
          text: `Setting: ${data.directory}`,
          data,
        },
      });
  };
}
