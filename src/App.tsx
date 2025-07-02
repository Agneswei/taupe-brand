import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import { CurrencyProvider } from './context/CurrencyContext';
import { PasswordProvider, usePassword } from './context/PasswordContext';
import PasswordGate from './components/PasswordGate';
import Layout from './components/Layout';
import Home from './pages/Home';
import Clothing from './pages/Clothing';
import Accessories from './pages/Accessories';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import TaupeOnYou from './pages/TaupeOnYou';

const AppContent: React.FC = () => {
  const { isAuthenticated, setAuthenticated } = usePassword();

  if (!isAuthenticated) {
    return <PasswordGate onPasswordCorrect={() => setAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="clothing" element={<Clothing />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="taupe-on-you" element={<TaupeOnYou />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<div className="p-10 text-center">Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App: React.FC = () => {
  return (
    <PasswordProvider>
      <CurrencyProvider> 
        <CartProvider>
          <AppContent />
        </CartProvider>
      </CurrencyProvider>
    </PasswordProvider>
  );
};

export default App;