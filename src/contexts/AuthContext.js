import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const {
    user, userType, loading, handleLogin
  } = useAuth();

  return (
    <AuthContext.Provider value={{ user, userType, loading, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };