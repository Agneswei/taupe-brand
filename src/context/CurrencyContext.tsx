import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available currencies
export type Currency = 'THB' | 'USD' | 'SGD';

// Currency conversion rates (relative to THB)
export const CURRENCY_RATES: Record<Currency, number> = {
  THB: 1,
  USD: 0.029, // 1 THB = 0.029 USD (approx)
  SGD: 0.039, // 1 THB = 0.039 SGD (approx)
};

// Define currency symbols
export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  THB: '฿',
  USD: '$',
  SGD: 'S$',
};

// Define the currency context type
type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInTHB: number) => string;
};

// Create the currency context
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Create the currency provider component
export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('THB');

  // Format price based on selected currency
  const formatPrice = (priceInTHB: number): string => {
    const rate = CURRENCY_RATES[currency];
    const convertedPrice = priceInTHB * rate;
    
    return `${CURRENCY_SYMBOLS[currency]}${convertedPrice.toLocaleString(
      currency === 'THB' ? 'th-TH' : 'en-US',
      { minimumFractionDigits: currency === 'THB' ? 0 : 2, maximumFractionDigits: currency === 'THB' ? 0 : 2 }
    )}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook to use the currency context
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};