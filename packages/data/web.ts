/* eslint-disable import/no-anonymous-default-export */
export const WEB = {
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  API: {
    MEDIA_ITEMS_EXIF: '/api/media-items/exif',
    MEDIA_ITEMS_LIST: '/api/media-items/list',
    MEDIA_ITEMS_BATCH_GET: '/api/media-items/batch-get',
    MEDIA_ITEMS_PROXY_URL: '/api/media-items/proxy-url',
    OAUTH2: '/api/oauth2',
  },
  ROUTES: {
    ROOT: '/',
    PHOTOS: '/photos',
    LIBRARY: (libraryId: string) => `/photos/library/${libraryId}`,
    SYNC: '/photos/sync',
  },
};
