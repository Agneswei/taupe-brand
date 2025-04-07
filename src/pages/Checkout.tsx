import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  
  // Form state
  const [email, setEmail] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [shippingCost, setShippingCost] = useState(750); // $7.50 in cents
  
  // Calculate subtotal
  const subtotal = cart.totalPrice;
  
  // Calculate tax (approximately 5% of subtotal)
  const taxRate = 0.05;
  const taxEstimate = Math.round(subtotal * taxRate);
  
  // Calculate total
  const total = subtotal + shippingCost + taxEstimate;
  
  // Format price from cents to dollars
  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  // Format price with currency
  const formatPriceWithCurrency = (price: number, currency = 'CAD') => {
    return `$${formatPrice(price)} ${currency}`;
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically handle authentication/guest checkout logic
    // For now, we'll just navigate to a payment page
    navigate('/payment');
  };

  // If cart is empty, redirect to cart page
  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-light mb-6">Your cart is empty</h1>
        <Link 
          to="/clothing"
          className="bg-black text-white px-6 py-2 text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left - Shopping Bag */}
        <div className="md:w-3/5">
          <h1 className="text-xl uppercase mb-6">Shopping Bag</h1>
          
          <div className="border-b border-gray-200 py-4">
            <div className="flex justify-between text-sm uppercase">
              <div>Item</div>
              <div>Total</div>
            </div>
          </div>

          {/* Cart Items */}
          {cart.items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="py-6 border-b border-gray-200">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-24">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full"
                  />
                </div>

                {/* Product Details and Price */}
                <div className="flex-1 flex justify-between">
                  <div>
                    <h3 className="uppercase font-medium">{item.name}</h3>
                    <p className="text-sm mt-1">SIZE: {item.size}</p>
                    {item.color && <p className="text-sm">{item.color}</p>}
                    
                    <div className="mt-4 flex space-x-6">
                      <button className="text-sm hover:underline">Move to Wishlist</button>
                      <button className="text-sm hover:underline">Remove</button>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{formatPriceWithCurrency(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Order Totals */}
          <div className="py-6">
            <div className="flex justify-between py-2">
              <div>Total</div>
              <div>{formatPriceWithCurrency(subtotal)}</div>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <div>Shipping estimate</div>
              <div>Calculated at Checkout</div>
            </div>
            <div className="flex justify-between py-2 font-medium">
              <div>Order Total</div>
              <div>{formatPriceWithCurrency(subtotal)}</div>
            </div>
          </div>
        </div>

        {/* Right - Checkout */}
        <div className="md:w-2/5">
          <div className="bg-gray-50 p-6">
            <h2 className="text-xl mb-6">Checkout</h2>
            
            <form onSubmit={handleProceedToCheckout}>
              <p className="mb-4">Enter your email to login or continue to checkout as a guest.</p>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm mb-1">Email address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-black text-white py-3 uppercase text-sm font-medium hover:bg-gray-800 transition mb-6"
              >
                Proceed to checkout
              </button>
            </form>

            <div className="mt-8">
              <h2 className="text-xl mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div>Deliver to Me (1)</div>
                  <div>${formatPrice(subtotal / 100)}</div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <span>Shipping Estimate</span>
                    <span className="inline-block ml-1 w-5 h-5 rounded-full border border-gray-400 text-center text-xs">?</span>
                  </div>
                  <div>${formatPrice(shippingCost / 100)}</div>
                </div>
                
                <div>
                  <Link to="/signin" className="text-sm underline">Sign in</Link> for free shipping on orders over $50.
                </div>
                
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <span>Tax Estimate</span>
                    <span className="inline-block ml-1 w-5 h-5 rounded-full border border-gray-400 text-center text-xs">?</span>
                  </div>
                  <div>${formatPrice(taxEstimate / 100)}</div>
                </div>
                
                <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                  <div>Estimated Total</div>
                  <div>${formatPrice(total / 100)}</div>
                </div>
              </div>
              
              <button 
                className="w-full bg-black text-white py-3 text-center mt-4 mb-4"
              >
                Checkout
              </button>
              
              <div className="border border-gray-300 py-4 px-2 text-center mb-4">
                <div className="font-bold">PayPal</div>
              </div>
              
              <div className="text-sm">
                <p>4 payments of ${formatPrice((total / 4) / 100)} with <strong>Klarna</strong>. <Link to="#" className="underline">Learn More</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;