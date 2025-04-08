import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, Currency } from '../context/CurrencyContext';

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Available currencies
  const currencies: Currency[] = ['THB', 'USD', 'SGD'];

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle currency selection
  const handleSelectCurrency = (selectedCurrency: Currency) => {
    setCurrency(selectedCurrency);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 hover:opacity-70 transition"
        aria-label="Select currency"
      >
        {currency}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-20 bg-white shadow-md z-50 rounded-sm border border-gray-200">
          <div className="py-1">
            {currencies.map((curr) => (
              <button
                key={curr}
                onClick={() => handleSelectCurrency(curr)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currency === curr ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;