/* eslint-disable import/no-anonymous-default-export */
export const WEB = {
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_SERVER: typeof window === 'undefined',
  API: {
    OAUTH2: '/api/oauth2',
  },
  EMAIL: 'chris@chrisesplin.com',
  ROUTES: {
    ROOT: '/',
    PHOTOS: '/photos',
    LIBRARY: (libraryId: string) => `/photos/library/${libraryId}`,
    SYNC: '/photos/sync',
  },
  URLS: {
    GITHUB: 'https://github.com/deltaepsilon/jupiter',
    TWITTER: 'https://twitter.com/chrisesplin',
    REDDIT: 'https://www.reddit.com/user/chrisesplin',
    PORTFOLIO: 'https://www.chrisesplin.com',
    WEB: 'https://photos.chrisesplin.com/',
    DOWNLOADS: 'https://photos.chrisesplin.com/#desktop-app-downloads',
  },
  ZIP_DOWNLOADS: [
    { platform: 'linux', icon: '/icons/linux.svg', filename: 'quiver-photos-linux-x64.zip' },
    { platform: 'linux', icon: '/icons/linux.svg', filename: 'quiver-photos-linux-arm64.zip' },
    { platform: 'macos', icon: '/icons/apple.svg', filename: 'quiver-photos-macos-x64.zip' },
    { platform: 'windows', icon: '/icons/windows.svg', filename: 'quiver-photos-windows-x64.zip' },
    { platform: 'windows', icon: '/icons/windows.svg', filename: 'quiver-photos-windows-arm64.zip' },
  ],
};
