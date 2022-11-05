import { AuthContext } from 'ui/contexts/auth-context';
import { useContext } from 'react';

export function useAuth() {
  return useContext(AuthContext);
}
