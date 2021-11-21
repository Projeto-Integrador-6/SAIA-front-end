import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const {
    user, userType, loading, handleLogin, handleLogout
  } = useAuth();

  return (
    <AuthContext.Provider value={{ user, userType, loading, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };