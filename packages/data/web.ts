/* eslint-disable import/no-anonymous-default-export */
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const WEB = {
  IS_DEVELOPMENT,
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
  STRIPE: {
    CUSTOMER_PORTAL: IS_DEVELOPMENT
      ? 'https://billing.stripe.com/p/login/test_bIY4k83VV6eQ8KI5kk'
      : 'https://billing.stripe.com/p/login/eVa6s83UE8ns6mA8ww',
    SUCCESS: '/subscription/confirmation',
    CANCEL: '/',
    PRICE: IS_DEVELOPMENT ? 'price_0MsnI9yBv2ELWtBDc2q2Gx6a' : 'price_0Msn29yBv2ELWtBDK4SYr9Dd',
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
