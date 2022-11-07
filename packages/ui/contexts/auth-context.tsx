import { GoogleAuthProvider, User, getAuth, signInWithPopup } from 'firebase/auth';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { NOOP } from 'ui/utils';
import { WEB } from 'data/web';
import nookies from 'nookies';
import { useFirebase } from 'ui/contexts';
import { useRouter } from 'next/router';

export interface AuthValue {
  signInWithGoogle: () => void;
  signOut: () => void;
  user?: User | null;
}

const DEFAULT_AUTH: AuthValue = { signInWithGoogle: NOOP, signOut: NOOP, user: null };

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
  const { app } = useFirebase();
  const [user, setUser] = useState<User | null | undefined>();
  const signInWithGoogle = useCallback(() => {
    if (app) {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      provider.addScope('https://www.googleapis.com/auth/photoslibrary.readonly');

      return signInWithPopup(auth, provider);
    }
  }, [app]);
  const signOut = useCallback(() => {
    if (app) {
      const auth = getAuth(app);

      auth.signOut();
    }
  }, [app]);

  useEffect(() => {
    if (app) {
      const unsubscribe = getAuth(app).onAuthStateChanged(async (user) => {
        console.log('auth', { user });
        setUser(user);

        const token = await user?.getIdToken();

        token && nookies.set(undefined, 'token', token, { path: '/' });
      });

      return () => unsubscribe();
    }
  }, [app]);

  return <AuthContext.Provider value={{ signInWithGoogle, signOut, user }}>{children}</AuthContext.Provider>;
}
