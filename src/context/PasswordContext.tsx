import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type PasswordContextType = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  checkAuthentication: () => boolean;
};

const PasswordContext = createContext<PasswordContextType | undefined>(undefined);

export const PasswordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const hasAccess = sessionStorage.getItem('taupeAccess') === 'granted';
    setIsAuthenticated(hasAccess);
  }, []);

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    if (value) {
      sessionStorage.setItem('taupeAccess', 'granted');
    } else {
      sessionStorage.removeItem('taupeAccess');
    }
  };

  const checkAuthentication = () => {
    return sessionStorage.getItem('taupeAccess') === 'granted';
  };

  return (
    <PasswordContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        checkAuthentication
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => {
  const context = useContext(PasswordContext);
  if (context === undefined) {
    throw new Error('usePassword must be used within a PasswordProvider');
  }
  return context;
};
