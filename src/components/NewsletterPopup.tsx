import React, { useState } from 'react';

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send this to your newsletter service
      console.log('Newsletter signup:', { email });
      
      setIsSubmitted(true);
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        // Reset state after closing
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail('');
        }, 300);
      }, 2000);
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset state after closing
      setTimeout(() => {
        setEmail('');
        setError('');
        setIsSubmitted(false);
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 relative transform transition-all duration-300 ease-out scale-100 opacity-100">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          disabled={isSubmitting}
          aria-label="Close newsletter signup"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="p-8">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-light tracking-wide mb-3">Stay Timeless with Us</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Subscribe to our newsletter to get 10% off your first order. Be the first to know about new collections, special offers, and style inspiration.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-black transition-colors text-sm"
                    required
                    disabled={isSubmitting}
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full bg-black text-white py-3 rounded-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium tracking-wide text-sm"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                </button>
              </form>

              {/* Privacy Notice */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our{' '}
                  <a href="/privacy-policy" className="underline hover:text-gray-700">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-6">
              <div className="mb-4">
                <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-light mb-2">Welcome to the Family!</h3>
              <p className="text-gray-600 text-sm">
                Thank you for subscribing. Check your email for your 10% discount code!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;