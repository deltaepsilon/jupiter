import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { createContext, useContext, useEffect, useState } from 'react';

import { WEB } from 'data/web';

declare global {
  interface Window {
    getUA: () => string;
  }
}

interface FirebaseValue {
  app: FirebaseApp | null;
}

const FirebaseContext = createContext<FirebaseValue>({ app: null });

export function useFirebase() {
  return useContext(FirebaseContext);
}

interface Props {
  children: React.ReactNode;
  appName: string;
}

export function FirebaseProvider({ children, appName }: Props) {
  const [app, setApp] = useState<FirebaseValue['app']>(null);

  useEffect(() => {
    if (!window.getUA) {
      window.getUA = () => navigator.userAgent;
    }

    let app;

    if (!getApps().length) {
      app = initializeApp(WEB.FIREBASE, appName);
    } else {
      app = getApp(appName);
    }

    setApp(app);
  }, [appName]);

  return <FirebaseContext.Provider value={{ app }}>{children}</FirebaseContext.Provider>;
}
