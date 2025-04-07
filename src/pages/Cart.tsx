import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Format price from cents to dollars
  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  // Format price with currency
  const formatPriceWithCurrency = (price: number, currency = 'CAD') => {
    return `$${formatPrice(price)} ${currency}`;
  };

  // Handle quantity change
  const handleQuantityChange = (id: number, size: string, newQuantity: number) => {
    updateQuantity(id, size, newQuantity);
  };

  // Handle remove item
  const handleRemoveItem = (id: number, size: string) => {
    removeFromCart(id, size);
  };

  // Handle move to wishlist (placeholder for now)
  const handleMoveToWishlist = (id: number, size: string) => {
    // In a real application, this would add the item to a wishlist
    console.log(`Moving item ${id} size ${size} to wishlist`);
    // Then remove from cart
    removeFromCart(id, size);
  };

  // Proceed to checkout
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-xl uppercase mb-6">Shopping Bag</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="mb-6">Your shopping bag is empty.</p>
          <Link 
            to="/clothing" 
            className="inline-block bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
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
                      <button 
                        className="text-sm hover:underline"
                        onClick={() => handleMoveToWishlist(item.id, item.size)}
                      >
                        Move to Wishlist
                      </button>
                      <button 
                        className="text-sm hover:underline"
                        onClick={() => handleRemoveItem(item.id, item.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{formatPriceWithCurrency(item.price * item.quantity)}</p>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-end mt-2">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                        className="border border-gray-300 w-8 h-8 flex items-center justify-center"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                        className="border border-gray-300 w-8 h-8 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div className="flex flex-col md:flex-row justify-between py-6">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <Link to="/clothing" className="text-sm underline hover:text-gray-600">
                Continue Shopping
              </Link>
            </div>
            
            <div className="md:w-1/2 lg:w-1/3 bg-gray-50 p-6">
              <h2 className="text-xl font-light mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{formatPriceWithCurrency(cart.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping estimate</span>
                  <span>Calculated at Checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 mb-6">
                <div className="flex justify-between font-medium">
                  <span>Order Total</span>
                  <span>{formatPriceWithCurrency(cart.totalPrice)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 mb-4 uppercase tracking-wider text-sm font-medium hover:bg-gray-800 transition"
              >
                Proceed to Checkout
              </button>

              {/* Payment Icons */}
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;