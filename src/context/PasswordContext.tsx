import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type PasswordContextType = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  checkAuthentication: () => boolean;
  showNewsletterPopup: boolean;
  setShowNewsletterPopup: (value: boolean) => void;
  hasSeenNewsletter: boolean;
  setHasSeenNewsletter: (value: boolean) => void;
};

const PasswordContext = createContext<PasswordContextType | undefined>(undefined);

export const PasswordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [hasSeenNewsletter, setHasSeenNewsletter] = useState(false);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const hasAccess = sessionStorage.getItem('taupeAccess') === 'granted';
    const hasSeenNewsletterBefore = sessionStorage.getItem('taupeNewsletterSeen') === 'true';
    
    setIsAuthenticated(hasAccess);
    setHasSeenNewsletter(hasSeenNewsletterBefore);
  }, []);

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    if (value) {
      sessionStorage.setItem('taupeAccess', 'granted');
      
      // Show newsletter popup after successful authentication
      // Only if they haven't seen it before
      if (!hasSeenNewsletter) {
        setTimeout(() => {
          setShowNewsletterPopup(true);
        }, 500); // Small delay for better UX
      }
    } else {
      sessionStorage.removeItem('taupeAccess');
    }
  };

  const handleSetHasSeenNewsletter = (value: boolean) => {
    setHasSeenNewsletter(value);
    if (value) {
      sessionStorage.setItem('taupeNewsletterSeen', 'true');
    } else {
      sessionStorage.removeItem('taupeNewsletterSeen');
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
        checkAuthentication,
        showNewsletterPopup,
        setShowNewsletterPopup,
        hasSeenNewsletter,
        setHasSeenNewsletter: handleSetHasSeenNewsletter
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