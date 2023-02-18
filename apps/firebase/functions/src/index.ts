import * as dotenv from 'dotenv';
import * as functions from 'firebase-functions';
import * as libraryImport from './library-import';
import * as mediaItems from './media-items';
import * as oauth from './oauth';

import { cors } from './utils';

dotenv.config();

/**
 * Don't forget /bin/gcloud/cors.sh
 *
 * You'll need to add lines to that file and run it to resolve CORS issues.
 * https://cloud.google.com/functions/docs/securing/managing-access-iam
 */

export const batchGetMediaItems = functions.https.onCall(mediaItems.batchGet);
export const batchGetMediaItemsOnRequest = functions.https.onRequest(cors(mediaItems.batchGetOnRequest));
export const listMediaItems = functions.https.onCall(mediaItems.list);
export const refreshMediaItemStats = functions.https.onCall(mediaItems.refreshStats);

export const getAuthUrl = functions.https.onCall(oauth.getAuthUrl);
export const refreshAccessToken = functions.https.onRequest(cors(oauth.refreshAccessToken));

export const setLibraryImportStatus = functions.https.onCall(libraryImport.setLibraryImportStatus);
export const handleLibraryImport = functions.database
  .ref(libraryImport.LIBRARY_IMPORT_PATH)
  .onWrite(libraryImport.libraryImportOnWrite);
