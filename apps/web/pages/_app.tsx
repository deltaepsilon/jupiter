import 'ui/styles/root.css';

import { AuthProvider, FirebaseProvider } from 'ui/contexts';

import { AppLayout } from 'ui/components/app';
import { AppProps } from 'next/app';
import { ServiceWorkerProvider } from 'web/contexts/service-worker-context';
import { WEB } from 'data/web';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <FirebaseProvider appName={WEB.FIREBASE.APP_NAME}>
        <AuthProvider>
          <ServiceWorkerProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ServiceWorkerProvider>
        </AuthProvider>
      </FirebaseProvider>
    </>
  );
}
