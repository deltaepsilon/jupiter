import { MessageAction, messageSchemasByAction } from 'data/service-worker';

import { Database } from 'firebase/database';
import { Firestore } from 'firebase/firestore/lite';
import { User } from 'firebase/auth';
import { getLibraryDownloadInstance } from './init-library-download';
import { z } from 'zod';

type Message =
  | z.infer<typeof messageSchemasByAction[MessageAction.libraryDownloadInit]>
  | z.infer<typeof messageSchemasByAction[MessageAction.libraryDownloadStart]>
  | z.infer<typeof messageSchemasByAction[MessageAction.libraryDownloadPause]>
  | z.infer<typeof messageSchemasByAction[MessageAction.libraryDownloadCancel]>
  | z.infer<typeof messageSchemasByAction[MessageAction.libraryDownloadDestroy]>;

export async function handleLibraryDownloadMessage({
  database,
  db,
  message,
  user,
}: {
  database: Database;
  db: Firestore;
  message: Message;
  user: User;
}) {
  const userId = user.uid;
  const libraryDownload = await getLibraryDownloadInstance({
    database,
    db,
    directoryHandle: message.data.directoryHandle,
    libraryId: message.data.libraryId,
    userId,
  });

  switch (message.action) {
    case MessageAction.libraryDownloadInit:
      console.info('forcing initialization of library download');
      break;

    case MessageAction.libraryDownloadStart:
      libraryDownload.start();
      break;

    case MessageAction.libraryDownloadPause:
      libraryDownload.pause();
      break;

    case MessageAction.libraryDownloadCancel:
      libraryDownload.cancel();
      break;

    case MessageAction.libraryDownloadDestroy:
      libraryDownload.destroy();
      break;
  }
}
