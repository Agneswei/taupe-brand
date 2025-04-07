import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardElement, 
  useStripe, 
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51RB5rjPiC94MDr5SnhKfIZ2W9pjmV2L8m96BmRFRfFWFlUDz8PCXenUIXZkwGU6o03iZDVGGQMoKuLVdmDRCeF0z00XcpltNkf');

// Type for the PaymentForm props
interface PaymentFormProps {
  onPaymentComplete: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setProcessing(true);
    
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 /* amount in cents */ }),
      });
      
      const { clientSecret } = await response.json();
      
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        setError('Card element not found');
        setProcessing(false);
        return;
      }
      
      // Confirm the payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Jenny Rosen', // Replace with actual customer name from form
          },
        },
      });
      
      if (result.error) {
        setError(result.error.message || 'An error occurred');
        setProcessing(false);
      } else {
        onPaymentComplete();
      }
    } catch (err) {
      setError('An error occurred while processing payment');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm mb-1">Card Details</label>
        <div className="border border-gray-300 p-3 rounded">
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#32325d',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
              },
            },
          }} />
        </div>
        {error && <div className="text-red-500 mt-1 text-sm">{error}</div>}
      </div>
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full bg-black text-white py-3 uppercase text-sm ${
          !stripe || processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
        }`}
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

// Main Checkout component
const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Form state
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [apartment, setApartment] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('Canada');
  const [state, setState] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [shippingMethod, setShippingMethod] = useState<string>('standard');
  const [step, setStep] = useState<'information' | 'shipping' | 'payment'>('information');

  // Shipping methods data
  const shippingMethods = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 200,
      description: 'Standard shipping',
      estimatedDelivery: '3-5 business days'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 600,
      description: 'Express shipping',
      estimatedDelivery: '1-2 business days'
    }
  ];
  
  // Calculate subtotal
  const subtotal = cart.totalPrice;
  
  // Get selected shipping method
  const selectedShipping = shippingMethods.find(method => method.id === shippingMethod) || shippingMethods[0];
  
  // Calculate tax (estimate - 7% of subtotal)
  const tax = Math.round(subtotal * 0.07);
  
  // Calculate total
  const total = subtotal + selectedShipping.price + tax;

  // Format price from cents to dollars
  const formatPrice = (price: number) => {
    return `฿${(price).toLocaleString("th-TH")}`;
};

  // Handle continue to shipping
  const handleContinueToShipping = (e: FormEvent) => {
    e.preventDefault();
    setStep('shipping');
  };

  // Handle continue to payment
  const handleContinueToPayment = (e: FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  // Handle back to information
  const handleBackToInformation = () => {
    setStep('information');
  };

  // Handle back to shipping
  const handleBackToShipping = () => {
    setStep('shipping');
  };

  // Handle payment complete
  const handlePaymentComplete = () => {
    // Clear cart and navigate to success page
    clearCart();
    navigate('/order-confirmation');
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
    <Elements stripe={stripePromise}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light">TAUPE</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left - Checkout Form */}
          <div className="lg:w-3/5">
            {/* Progress Steps */}
            <div className="flex mb-8 text-sm">
              <div 
                className={`${step === 'information' ? 'font-medium' : ''} flex items-center cursor-pointer`}
                onClick={() => step !== 'information' && setStep('information')}
              >
                Information
              </div>
              <div className="mx-2 text-gray-400">{'>'}</div>
              <div 
                className={`${step === 'shipping' ? 'font-medium' : ''} flex items-center cursor-pointer`}
                onClick={() => step === 'payment' && setStep('shipping')}
              >
                Shipping
              </div>
              <div className="mx-2 text-gray-400">{'>'}</div>
              <div 
                className={`${step === 'payment' ? 'font-medium' : ''} flex items-center`}
              >
                Payment
              </div>
            </div>

            {/* Information Step */}
            {step === 'information' && (
              <form onSubmit={handleContinueToShipping}>
                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="font-medium mb-4">Contact information</h2>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-8">
                  <h2 className="font-medium mb-4">Shipping address</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm mb-1">First name</label>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm mb-1">Last name</label>
                      <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm mb-1">Address</label>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="apartment" className="block text-sm mb-1">Apartment, suite, etc. (optional)</label>
                    <input
                      type="text"
                      id="apartment"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="city" className="block text-sm mb-1">City</label>
                      <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm mb-1">Country/Region</label>
                      <select
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 bg-white"
                        required
                      >
                        <option value="Canada">Canada</option>
                        <option value="United States">United States</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="state" className="block text-sm mb-1">State/Province</label>
                      <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm mb-1">Postal code</label>
                      <input
                        type="text"
                        id="postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm mb-1">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => navigate('/cart')}
                    className="text-sm text-gray-600 hover:text-black underline"
                  >
                    Return to cart
                  </button>
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition"
                  >
                    Continue to shipping
                  </button>
                </div>
              </form>
            )}

            {/* Shipping Step */}
            {step === 'shipping' && (
              <form onSubmit={handleContinueToPayment}>
                {/* Contact and Shipping Summary */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="text-sm">{email}</p>
                    <button
                      type="button"
                      onClick={handleBackToInformation}
                      className="text-sm text-gray-600 hover:text-black underline"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Ship to</p>
                    <p className="text-sm">{address}, {city}, {state}, {postalCode}, {country}</p>
                    <button
                      type="button"
                      onClick={handleBackToInformation}
                      className="text-sm text-gray-600 hover:text-black underline"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Shipping Methods */}
                <div className="mb-8">
                  <h2 className="font-medium mb-4">Shipping method</h2>
                  
                  {shippingMethods.map((method) => (
                    <div 
                      key={method.id}
                      className={`border ${shippingMethod === method.id ? 'border-black' : 'border-gray-300'} p-4 mb-3 flex items-center cursor-pointer`}
                      onClick={() => setShippingMethod(method.id)}
                    >
                      <input
                        type="radio"
                        id={method.id}
                        name="shippingMethod"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={() => setShippingMethod(method.id)}
                        className="mr-3"
                      />
                      <label htmlFor={method.id} className="flex-grow cursor-pointer">
                        <div className="flex justify-between">
                          <div>
                            <p>{method.name}</p>
                            <p className="text-sm text-gray-600">{method.estimatedDelivery}</p>
                          </div>
                          <p>{formatPrice(method.price)}</p>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleBackToInformation}
                    className="text-sm text-gray-600 hover:text-black underline"
                  >
                    Return to information
                  </button>
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition"
                  >
                    Continue to payment
                  </button>
                </div>
              </form>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <div>
                {/* Contact and Shipping Summary */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="text-sm">{email}</p>
                    <button
                      type="button"
                      onClick={handleBackToInformation}
                      className="text-sm text-gray-600 hover:text-black underline"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-600">Ship to</p>
                    <p className="text-sm">{address}, {city}, {state}, {postalCode}, {country}</p>
                    <button
                      type="button"
                      onClick={handleBackToInformation}
                      className="text-sm text-gray-600 hover:text-black underline"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Method</p>
                    <p className="text-sm">{selectedShipping.name} · {formatPrice(selectedShipping.price)}</p>
                    <button
                      type="button"
                      onClick={handleBackToShipping}
                      className="text-sm text-gray-600 hover:text-black underline"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <h2 className="font-medium mb-4">Payment</h2>
                  <PaymentForm onPaymentComplete={handlePaymentComplete} />
                </div>
              </div>
            )}
          </div>

          {/* Right - Order Summary */}
          <div className="lg:w-2/5">
            <div className="bg-gray-50 p-6">
              <h2 className="text-xl mb-6">Order Summary</h2>
              
              {cart.items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex mb-4 pb-4 border-b border-gray-200">
                  <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">Size: {item.size}</p>
                    {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                  </div>
                  <div className="text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(selectedShipping.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200 font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Checkout;