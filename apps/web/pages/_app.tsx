import 'ui/styles/root.css';

import { AuthProvider, FirebaseProvider } from 'ui/contexts';

import { AppLayout } from 'ui/components/app';
import { AppProps } from 'next/app';
import { FIREBASE } from 'data/firebase';
import { ServiceWorkerProvider } from 'web/contexts/service-worker-context';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <FirebaseProvider appName={FIREBASE.CONFIG.APP_NAME}>
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
