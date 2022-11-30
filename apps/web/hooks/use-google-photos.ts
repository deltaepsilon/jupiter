import { MediaItems, mediaItemsResponseSchema } from 'data/media-items';
import nookies, { parseCookies } from 'nookies';
import { useCallback, useState } from 'react';

import { Cookie } from 'data/sync';
import { WEB } from 'data/web';
import { addParams } from 'ui/utils';
import { useRouter } from 'next/router';

export function useGooglePhotos() {
  const [firstPage, setFirstPage] = useState<MediaItems>();
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const router = useRouter();
  const selectLibrary = useCallback(async () => {
    const cookies = parseCookies();
    try {
      const { accessToken, refreshToken, mediaItems } = await getFirstPage({
        accessToken: cookies.accessToken,
        refreshToken: cookies.refreshToken,
      });

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      nookies.set(null, Cookie.accessToken, accessToken, { path: '/' });
      nookies.set(null, Cookie.refreshToken, refreshToken, { path: '/' });

      setFirstPage(mediaItems);
    } catch (res) {
      if (res instanceof Response && res.status === 401) {
        const response = await fetch(
          addParams(`${location.origin}${WEB.API.OAUTH2}`, { redirect: window.location.href })
        );
        const { authUrl } = await response.json();

        router.replace(authUrl);
      } else {
        throw res;
      }
    }
  }, [router]);
  const clearLibrary = useCallback(async () => {
    nookies.set(null, Cookie.accessToken, '', { path: '/' });
    nookies.set(null, Cookie.refreshToken, '', { path: '/' });

    setFirstPage(undefined);
  }, []);
  const changeLibrary = useCallback(async () => {
    clearLibrary();

    selectLibrary();
  }, [clearLibrary, selectLibrary]);

  return { accessToken, refreshToken, firstPage, changeLibrary, clearLibrary, getFirstPage, selectLibrary };
}

async function getFirstPage({ accessToken, refreshToken }: { accessToken?: string; refreshToken: string }) {
  const response = await fetch(
    addParams(`${location.origin}${WEB.API.MEDIA_ITEMS}`, { accessToken, refreshToken, pageSize: 9 })
  );

  if (response.ok) {
    const data = await response.json();

    return mediaItemsResponseSchema.parse(data);
  } else {
    throw response;
  }
}
