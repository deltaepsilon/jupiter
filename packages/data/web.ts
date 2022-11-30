/* eslint-disable import/no-anonymous-default-export */
export const WEB = {
  API: {
    MEDIA_ITEMS: '/api/media-items',
    OAUTH2: '/api/oauth2',
  },
  DATABASE: {
    PATHS: {
      LIBRARY_MEDIA_ITEMS: (userId: string, libraryId: string) =>
        `user-owned/${userId}/library/${libraryId}/media-items`,
      LIBRARY_IMPORT: (userId: string, libraryId: string) => `user-owned/${userId}/library/${libraryId}/import`,
      SYNC_TASKS: (userId: string) => `user-owned/${userId}/sync-tasks`,
    },
  },
  FIREBASE: {
    APP_NAME: 'google-photos',
    apiKey: 'AIzaSyCwCbnCcsSyqLdpMGygRFGp-xMfdZDVSEA',
    authDomain: 'photos-tools-2022.firebaseapp.com',
    projectId: 'photos-tools-2022',
    storageBucket: 'photos-tools-2022.appspot.com',
    messagingSenderId: '550579950350',
    appId: '1:550579950350:web:d32a68a214c5c58a273d5f',
    measurementId: 'G-5M5ME2ZH0R',
  },
  FIRESTORE: {
    COLLECTIONS: {
      LIBRARIES: (userId: string) => `users/${userId}/libraries`,
      LIBRARY: (userId: string, libraryId: string) => `users/${userId}/libraries/${libraryId}`,
    },
  },
  ROUTES: {
    ROOT: '/',
    PHOTOS: '/photos',
    LIBRARY: (libraryId: string) => `/photos/library/${libraryId}`,
    SYNC: '/photos/sync',
  },
};
