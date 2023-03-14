import { GoogleAuthProvider, OAuthCredential, User, signInWithPopup } from 'firebase/auth';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { FIREBASE } from 'data/firebase';
import { NOOP } from 'ui/utils';
import { WEB } from 'data/web';
import { doc, setDoc } from 'firebase/firestore/lite';
import { useFirebase } from 'ui/contexts';
import { useRouter } from 'next/router';
import { userSchema } from 'data/user';

type Credential = OAuthCredential | null;
export interface AuthValue {
  credential?: Credential;
  signInWithGoogle: () => Promise<Credential>;
  signOut: () => void;
  user?: User | null;
  userId?: string;
}

const DEFAULT_AUTH: AuthValue = { signInWithGoogle: async () => null, signOut: NOOP, user: null };

export const AuthContext = createContext<AuthValue>(DEFAULT_AUTH);

export function useAuth({ forceRedirect }: { forceRedirect: boolean } = { forceRedirect: false }) {
  const value = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (forceRedirect && value.user === null) {
      router.replace(WEB.ROUTES.ROOT);
    }
  }, [forceRedirect, router, value.user]);

  return value;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { auth, db } = useFirebase();
  const [user, setUser] = useState<User | null | undefined>();
  const [credential, setCredential] = useState<Credential>(null);

  const signInWithGoogle = useCallback(async (): Promise<Credential> => {
    if (auth) {
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({ access_type: 'offline' });
      provider.addScope('https://www.googleapis.com/auth/photoslibrary.readonly');

      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      setCredential(credential);

      return credential;
    }

    return null;
  }, [auth]);
  const signOut = useCallback(() => {
    if (auth) {
      auth.signOut();
    }
  }, [auth]);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(async (user) => setUser(user));

      return () => unsubscribe();
    }
  }, [auth]);

  useEffect(() => {
    if (db && user) {
      setDoc(doc(db, FIREBASE.FIRESTORE.COLLECTIONS.USER(user.uid)), userSchema.parse(user));
    }
  }, [db, user]);

  return (
    <AuthContext.Provider value={{ credential, signInWithGoogle, signOut, user, userId: user?.uid }}>
      {children}
    </AuthContext.Provider>
  );
}
