import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation: React.FC = () => {
  // Generate a random order number
  const orderNumber = `T${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mx-auto mb-6 text-green-500"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      
      <h1 className="text-3xl font-light mb-4">Thank You For Your Order!</h1>
      <p className="text-lg mb-8">
        Your order #{orderNumber} has been placed and is being processed.
      </p>
      
      <div className="bg-gray-50 p-6 mb-8 text-left">
        <h2 className="text-xl mb-4">Order Summary</h2>
        <div className="border-b border-gray-200 pb-3 mb-3">
          <p>A confirmation email has been sent to your email address.</p>
        </div>
        <div className="flex justify-between mb-2">
          <span>Estimated delivery</span>
          <span>3-5 business days</span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
        <Link
          to="/account/orders"
          className="border border-black px-6 py-3 text-sm hover:bg-gray-100 transition"
        >
          View Order Status
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;