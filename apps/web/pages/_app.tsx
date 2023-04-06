import 'ui/styles/root.css';

import { AuthProvider, FirebaseProvider } from 'ui/contexts';

import { AppLayout } from 'ui/components/app';
import { AppProps } from 'next/app';
import { FIREBASE } from 'data/firebase';
import { Footer } from 'web/components/footer';
import { ServiceWorkerProvider } from 'web/contexts/service-worker-context';
import { useAnalytics } from '../hooks';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useAnalytics();

  return (
    <>
      <FirebaseProvider appName={FIREBASE.CONFIG.APP_NAME}>
        <AuthProvider>
          <ServiceWorkerProvider>
            <AppLayout>
              <Component {...pageProps} />
              <Footer />
            </AppLayout>
          </ServiceWorkerProvider>
        </AuthProvider>
      </FirebaseProvider>
    </>
  );
}
