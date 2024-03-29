import { WEB } from './web';
import firebaseJson from '../../apps/firebase/firebase.json';

const CONFIG = {
  APP_NAME: 'google-photos',
  apiKey: 'AIzaSyCwCbnCcsSyqLdpMGygRFGp-xMfdZDVSEA',
  authDomain: 'photos.chrisesplin.com',
  projectId: 'photos-tools-2022',
  storageBucket: 'photos-tools-2022.appspot.com',
  messagingSenderId: '550579950350',
  appId: '1:550579950350:web:d32a68a214c5c58a273d5f',
  measurementId: 'G-5M5ME2ZH0R',
};

const FUNCTIONS_BASE_URL_DEV = WEB.IS_DEVELOPMENT
  ? `http://localhost:${firebaseJson.emulators.functions.port}/${CONFIG.projectId}/us-central1`
  : `https://us-central1-photos-tools-2022.cloudfunctions.net`;

export const FIREBASE = {
  CONFIG,
  EMULATORS: {
    HOST: '127.0.0.1',
    AUTHENTICATION: firebaseJson.emulators.auth.port,
    FUNCTIONS: firebaseJson.emulators.functions.port,
    FIRESTORE: firebaseJson.emulators.firestore.port,
    DATABASE: firebaseJson.emulators.database.port,
    HOSTING: firebaseJson.emulators.hosting.port,
    STORAGE: firebaseJson.emulators.hosting.port,
    UI: firebaseJson.emulators.ui.port,
  },
  DATABASE: {
    PATHS: {
      LIBRARY: (userId: string, libraryId: string) => `user-owned/${userId}/library/${libraryId}`,
      LIBRARY_IMPORT: (userId: string, libraryId: string) => `user-owned/${userId}/library/${libraryId}/import`,
      LIBRARY_MEDIA_ITEMS: (userId: string, libraryId: string) =>
        `user-owned/${userId}/library/${libraryId}/media-items`,
      LIBRARY_STATS: (userId: string, libraryId: string) => `user-owned/${userId}/library/${libraryId}/stats`,
      LIBRARY_DAEMON: (userId: string, libraryId: string) => `user-owned/${userId}/library/${libraryId}/daemon`,
      LIBRARY_DOWNLOAD: (userId: string, libraryId: string) => `user-owned/${userId}/library/${libraryId}/download`,
      LIBRARY_DOWNLOAD_QUEUE: (userId: string, libraryId: string) =>
        `user-owned/${userId}/library/${libraryId}/download-queue`,
    },
  },
  FIRESTORE: {
    COLLECTIONS: {
      LIBRARIES: (userId: string) => `users/${userId}/libraries`,
      LIBRARY: (userId: string, libraryId: string) => `users/${userId}/libraries/${libraryId}`,
      USER: (userId: string) => `users/${userId}/metadata/user`,
      CLAIMS: (userId: string) => `users/${userId}/metadata/claims`,
      CHECKOUT_SESSIONS: (userId: string) => `users/${userId}/checkout_sessions`,
    },
  },
  FUNCTIONS: {
    REFRESH_ACCESS_TOKEN: `${FUNCTIONS_BASE_URL_DEV}/refreshAccessToken`,
    BATCH_GET_MEDIA_ITEMS: `${FUNCTIONS_BASE_URL_DEV}/batchGetMediaItemsOnRequest`,
  },
};
