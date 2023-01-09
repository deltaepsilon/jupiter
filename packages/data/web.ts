/* eslint-disable import/no-anonymous-default-export */
export const WEB = {
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  API: {
    OAUTH2: '/api/oauth2',
  },
  ROUTES: {
    ROOT: '/',
    PHOTOS: '/photos',
    LIBRARY: (libraryId: string) => `/photos/library/${libraryId}`,
    SYNC: '/photos/sync',
  },
};
