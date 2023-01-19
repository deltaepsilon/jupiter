import { https } from 'firebase-functions';

export function getContextAuth(context: https.CallableContext) {
  const xCallableContextAuth = (context.rawRequest.headers['x-callable-context-auth'] as string) ?? '';
  const fakeAuth = decodeURIComponent(xCallableContextAuth);
  const fakeAuthParsed = fakeAuth && JSON.parse(fakeAuth);
  const userId = context.auth?.uid || fakeAuthParsed?.uid;

  return { userId };
}
