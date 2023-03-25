import { GettersAndSetters } from './create-getters-and-setters';
import addSeconds from 'date-fns/addSeconds';
import axios from 'axios';
import { refreshAccessTokenResponse } from 'api/utils/jwt';

export async function refreshTokens({
  getTokens,
  getUrls,
  setTokens,
}: Pick<GettersAndSetters, 'getTokens' | 'getUrls' | 'setTokens'>) {
  const urls = await getUrls();
  const { refreshToken } = await getTokens();
  const res = await axios.post(urls.refreshAccessToken, { refreshToken: refreshToken });
  const { access_token, expires_in } = refreshAccessTokenResponse.parse(res.data);

  return setTokens({
    accessToken: access_token,
    refreshToken,
    expiresAt: addSeconds(new Date(), expires_in),
  });
}
