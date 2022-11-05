import { FirebaseApp, initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';

import { WEB } from 'data/web';

declare global {
  interface Window {
    getUA: () => string;
  }
}

export function useFirebase() {
  const [app, setApp] = useState<FirebaseApp>();

  useEffect(() => {
    window.getUA = () => navigator.userAgent;

    const app = initializeApp(WEB.FIREBASE);

    setApp(app);
  }, []);

  return { app };
}
