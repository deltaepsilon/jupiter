import { parseCookies, setCookie } from 'nookies';
import { useCallback, useState } from 'react';

import { Cookie } from 'data/auth';
import { MediaItems } from 'data/media-items';
import { useFunctions } from 'ui/hooks/use-functions';
import { useRouter } from 'next/router';

export function useGooglePhotos() {
  const [firstPage, setFirstPage] = useState<MediaItems>();
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const router = useRouter();
  const { getAuthUrl, listMediaItems } = useFunctions();
  const authenticate = useCallback(async () => {
    const { authUrl, redirect } = await getAuthUrl({
      host: window.location.host,
      protocol: window.location.protocol,
      redirect: window.location.href,
    });

    setCookie(null, Cookie.redirect, redirect, { path: '/' });

    authUrl && router.replace(authUrl);
  }, [getAuthUrl, router]);
  const getFirstPage = useCallback(
    async ({ accessToken, refreshToken }: { accessToken?: string; refreshToken: string }) =>
      listMediaItems({
        accessToken,
        refreshToken,
        pageSize: '9',
      }),
    [listMediaItems]
  );
  const selectLibrary = useCallback(async () => {
    const cookies = parseCookies();
    const needsCookies = !cookies.refreshToken;

    if (needsCookies) return authenticate();

    const result = await getFirstPage({ accessToken: cookies.accessToken, refreshToken: cookies.refreshToken });

    if (result.data) {
      const { accessToken, refreshToken, mediaItems } = result.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setFirstPage(mediaItems);
    } else if (result.error?.httpErrorCode.status === 401) {
      return authenticate();
    }
  }, [authenticate, getFirstPage]);
  const clearLibrary = useCallback(async () => {
    setCookie(null, Cookie.accessToken, '', { path: '/' });
    setCookie(null, Cookie.refreshToken, '', { path: '/' });

    setFirstPage(undefined);
  }, []);
  const changeLibrary = useCallback(async () => {
    clearLibrary();
    selectLibrary();
  }, [clearLibrary, selectLibrary]);

  return { accessToken, refreshToken, firstPage, changeLibrary, clearLibrary, getFirstPage, selectLibrary };
}
