import 'ui/styles/root.css';

import { AppLayout } from 'ui/components/app';
import { AppProps } from 'next/app';
import { AuthProvider } from 'ui/contexts';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <AuthProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </AuthProvider>
    </>
  );
}
