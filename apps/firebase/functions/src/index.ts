import * as dotenv from 'dotenv';
import * as functions from 'firebase-functions';
import * as libraryImport from './library-import';
import * as mediaItems from './media-items';
import * as oauth from './oauth';

dotenv.config();

export const batchGetMediaItems = functions.https.onCall(mediaItems.batchGet);
export const batchGetMediaItemsOnRequest = functions.https.onRequest(mediaItems.batchGetOnRequest);
export const listMediaItems = functions.https.onCall(mediaItems.list);

export const getAuthUrl = functions.https.onCall(oauth.getAuthUrl);
export const refreshAccessToken = functions.https.onRequest(oauth.refreshAccessToken);

export const setLibraryImportStatus = functions.https.onCall(libraryImport.setLibraryImportStatus);
export const handleLibraryImport = functions.database
  .ref(libraryImport.LIBRARY_IMPORT_PATH)
  .onWrite(libraryImport.libraryImportOnWrite);
