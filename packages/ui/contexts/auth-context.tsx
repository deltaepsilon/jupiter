import { GoogleAuthProvider, User, getAuth, signInWithPopup } from 'firebase/auth';
import { createContext, useCallback, useEffect, useState } from 'react';

import { NOOP } from 'ui/utils';
import nookies from 'nookies';
import { useFirebase } from 'ui/hooks/use-firebase';

export interface AuthValue {
  signInWithGoogle: () => void;
  signOut: () => void;
  user: User | null;
}

const DEFAULT_AUTH: AuthValue = { signInWithGoogle: NOOP, signOut: NOOP, user: null };

export const AuthContext = createContext<AuthValue>(DEFAULT_AUTH);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { app } = useFirebase();
  const [user, setUser] = useState<User | null>(null);
  const signInWithGoogle = useCallback(() => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/photoslibrary.readonly');

    return signInWithPopup(auth, provider);
  }, [app]);
  const signOut = useCallback(() => {
    const auth = getAuth(app);

    auth.signOut();
  }, [app]);

  useEffect(() => {
    if (app) {
      const unsubscribe = getAuth(app).onAuthStateChanged(async (user) => {
        setUser(user);

        const token = await user?.getIdToken();

        token && nookies.set(undefined, 'token', token, { path: '/' });
      });

      return () => unsubscribe();
    }
  }, [app]);

  return <AuthContext.Provider value={{ signInWithGoogle, signOut, user }}>{children}</AuthContext.Provider>;
}
