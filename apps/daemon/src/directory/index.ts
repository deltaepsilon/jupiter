import { DaemonMessage, DirectoryAction, MessageType, SendMessage, decodeMessage, encodeMessage } from 'data/daemon';

import { listDirectories } from './list-directories';
import { setDirectory } from './set-directory';

export async function directory({ message, sendMessage }: { message: DaemonMessage; sendMessage: SendMessage }) {
  switch (message.payload.action) {
    case DirectoryAction.list:
      return listDirectories(sendMessage, message);

    case DirectoryAction.set:
      return setDirectory(sendMessage, message);

    default:
      break;
  }
}

export function requestDirectory(sendMessage: SendMessage) {
  sendMessage({
    payload: { action: DirectoryAction.request, text: 'Requesting directory' },
    type: MessageType.directory,
  });
}
