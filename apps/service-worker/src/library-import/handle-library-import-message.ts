import { MessageAction, messageSchemasByAction } from 'data/service-worker';

import { Database } from 'firebase/database';
import { Firestore } from 'firebase/firestore/lite';
import { User } from 'firebase/auth';
import { getLibraryImportInstance } from './init-library-import';
import { z } from 'zod';

type Message =
  | z.infer<typeof messageSchemasByAction[MessageAction.libraryImportInit]>
  | z.infer<typeof messageSchemasByAction[MessageAction.libraryImportStart]>
  | z.infer<typeof messageSchemasByAction[MessageAction.libraryImportPause]>
  | z.infer<typeof messageSchemasByAction[MessageAction.libraryImportCancel]>
  | z.infer<typeof messageSchemasByAction[MessageAction.libraryImportDestroy]>;

export async function handleLibraryImportMessage({
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
  const libraryImport = await getLibraryImportInstance({ database, db, libraryId: message.data.libraryId, userId });

  switch (message.action) {
    case MessageAction.libraryImportInit:
      console.info('forcing initialization of library import');
      break;

    case MessageAction.libraryImportStart:
      libraryImport.start();
      break;

    case MessageAction.libraryImportPause:
      libraryImport.pause();
      break;

    case MessageAction.libraryImportCancel:
      libraryImport.cancel();
      break;

    case MessageAction.libraryImportDestroy:
      libraryImport.destroy();
      break;
  }
}
