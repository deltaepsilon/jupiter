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
  URLS: {
    GITHUB: 'https://github.com/deltaepsilon/jupiter',
    WEB: 'https://photos.chrisesplin.com/',
    DOWNLOADS: 'https://photos.chrisesplin.com/downloads',
  }
};
