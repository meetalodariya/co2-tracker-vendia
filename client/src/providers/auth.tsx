import React, { useState } from 'react';

export interface AuthUser {
  token: string;
}

export interface AuthContextType {
  user: AuthUser;
  signin: (user: AuthUser, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: { token: '' },
  signin: () => undefined,
  signout: () => undefined,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(
    JSON.parse(localStorage.getItem('user')),
  );

  const signin = (newUser: AuthUser, callback: VoidFunction) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    callback();
  };

  const signout = (callback: VoidFunction) => {
    localStorage.removeItem('user');
    setUser(null);
    callback();
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
