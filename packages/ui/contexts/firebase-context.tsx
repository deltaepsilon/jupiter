import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import { Database, connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Firestore, connectFirestoreEmulator, getFirestore } from 'firebase/firestore/lite';
import { Functions, connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { createContext, useContext, useEffect, useState } from 'react';

import { FIREBASE } from 'data/firebase';
import { WEB } from 'data/web';

declare global {
  interface Window {
    getUA: () => string;
  }
}

interface FirebaseValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  functions: Functions | null;
  db: Firestore | null;
  database: Database | null;
}

const FirebaseContext = createContext<FirebaseValue>({
  app: null,
  auth: null,
  database: null,
  db: null,
  functions: null,
});

export function useFirebase() {
  return useContext(FirebaseContext);
}

interface Props {
  children: React.ReactNode;
  appName: string;
}

export function FirebaseProvider({ children, appName }: Props) {
  const [app, setApp] = useState<FirebaseValue['app']>(null);
  const [functions, setFunctions] = useState<FirebaseValue['functions']>(null);
  const [db, setDb] = useState<FirebaseValue['db']>(null);
  const [database, setDatabase] = useState<FirebaseValue['database']>(null);
  const [auth, setAuth] = useState<FirebaseValue['auth']>(null);

  useEffect(() => {
    if (!window.getUA) {
      window.getUA = () => navigator.userAgent;
    }

    let app;

    if (!getApps().length) {
      app = initializeApp(FIREBASE.CONFIG, appName);
    } else {
      app = getApp(appName);
    }

    setApp(app);
  }, [appName]);

  useEffect(() => {
    if (app) {
      const auth = getAuth(app);
      const database = getDatabase(app);
      const db = getFirestore(app);
      const functions = getFunctions(app);

      if (WEB.IS_DEVELOPMENT) {
        connectAuthEmulator(auth, `http://${FIREBASE.EMULATORS.HOST}:${FIREBASE.EMULATORS.AUTHENTICATION}`);
        connectDatabaseEmulator(database, FIREBASE.EMULATORS.HOST, FIREBASE.EMULATORS.DATABASE);
        connectFunctionsEmulator(functions, FIREBASE.EMULATORS.HOST, FIREBASE.EMULATORS.FUNCTIONS);
        connectFirestoreEmulator(db, FIREBASE.EMULATORS.HOST, FIREBASE.EMULATORS.FIRESTORE);
      }

      setAuth(auth);
      setDb(db);
      setDatabase(database);
      setFunctions(functions);
    }
  }, [app]);

  return <FirebaseContext.Provider value={{ app, auth, database, db, functions }}>{children}</FirebaseContext.Provider>;
}
