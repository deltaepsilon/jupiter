import { https } from 'firebase-functions';

export function error(path: string, error: unknown) {
  console.error(path, error);

  if (error instanceof Error) {
    if (error.toString().includes('No access token found')) {
      return new https.HttpsError('unauthenticated', 'No access token found');
    }

    return new https.HttpsError('internal', error.toString());
  }

  return new https.HttpsError('internal', 'Unknown error');
}
