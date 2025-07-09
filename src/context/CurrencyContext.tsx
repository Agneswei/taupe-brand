import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available currencies
export type Currency = 'THB' | 'USD' | 'SGD';

// Currency conversion rates (relative to THB)
export const CURRENCY_RATES: Record<Currency, number> = {
  THB: 1,
  USD: 0.0307, // 1 THB = 0.0307 USD (current rate: 1 USD = 32.6 THB)
  SGD: 0.0413, // 1 THB = 0.0413 SGD (approx)
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
  formatPrice: (priceInTHB: number, customUSD?: number, customSGD?: number) => string;
};

// Create the currency context
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Create the currency provider component
export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('THB');

  // Format price based on selected currency
  const formatPrice = (priceInTHB: number, customUSD?: number, customSGD?: number): string => {
    const symbol = CURRENCY_SYMBOLS[currency];
    
    let price: number;
    
    switch (currency) {
      case 'USD':
        // Use custom USD price if provided, otherwise convert
        price = customUSD || (priceInTHB * CURRENCY_RATES.USD);
        break;
      case 'SGD':
        // Use custom SGD price if provided, otherwise convert
        price = customSGD || (priceInTHB * CURRENCY_RATES.SGD);
        break;
      default:
        price = priceInTHB;
    }
    
    return `${symbol}${price.toLocaleString(
      currency === 'THB' ? 'th-TH' : 'en-US',
      { 
        minimumFractionDigits: currency === 'THB' ? 0 : 0, // No decimals for cleaner look
        maximumFractionDigits: currency === 'THB' ? 0 : 0 
      }
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