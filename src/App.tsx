import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import { CurrencyProvider } from './context/CurrencyContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Clothing from './pages/Clothing';
import Accessories from './pages/Accessories';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import TaupeOnYou from './pages/TaupeOnYou';
// Import other page components as needed

const App: React.FC = () => {
  return (
    <CurrencyProvider> 
      <CartProvider> {/* Wrap everything in CartProvider */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Home route */}
              <Route index element={<Home />} />
              
              {/* Main pages */}
              <Route path="clothing" element={<Clothing />} />
              <Route path="accessories" element={<Accessories />} />
              <Route path="taupe-on-you" element={<TaupeOnYou />} />
              
              {/* Product pages */}
              <Route path="product/:id" element={<ProductDetail />} />
              
              {/* Cart and checkout flow */}
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-confirmation" element={<OrderConfirmation />} />
              
              {/* Other pages would go here */}
              {/* <Route path="about" element={<About />} /> */}
              {/* <Route path="contact" element={<Contact />} /> */}
              
              {/* 404 page */}
              <Route path="*" element={<div className="p-10 text-center">Page not found</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </CurrencyProvider>
  );
};

export default App;