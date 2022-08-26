import React, { createContext, useState, useEffect } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    authenticated, loading, handleLogout, user, token
  } = useAuth();

  return (
    <Context.Provider value={{ loading, authenticated, handleLogout ,user, token}}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };