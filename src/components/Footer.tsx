import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  // For mobile accordion functionality
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // In a real app, you would handle the newsletter signup here
      console.log(`Signing up ${email} for newsletter`);
      setSubscribed(true);
      setEmail('');
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Shop Column - Accordion on Mobile */}
          <div className="border-b md:border-b-0 pb-4 md:pb-0">
            <div 
              className="flex justify-between items-center mb-4 cursor-pointer md:cursor-default"
              onClick={() => toggleSection('shop')}
            >
              <h3 className="text-base font-medium">Shop</h3>
              <span className="md:hidden transition-transform duration-200 transform" style={{ 
                transform: expandedSection === 'shop' ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                ▼
              </span>
            </div>
            <ul className={`space-y-3 text-sm overflow-hidden transition-all duration-300 md:h-auto ${
              expandedSection === 'shop' ? 'max-h-80' : 'md:max-h-80 max-h-0'
            }`}>
              <li><Link to="/clothing" className="hover:underline">Clothing</Link></li>
              <li><Link to="/accessories" className="hover:underline">Accessories</Link></li>
              <li><Link to="/clothing?collection=Bare+Essentials" className="hover:underline">Bare Essentials</Link></li>
              <li><Link to="/clothing?collection=Summer+Mood" className="hover:underline">Summer Mood</Link></li>
              <li><Link to="/clothing?collection=Vie+Elegante" className="hover:underline">Vie Elegante</Link></li>
            </ul>
          </div>

          {/* Help Column - Accordion on Mobile */}
          <div className="border-b md:border-b-0 pb-4 md:pb-0">
            <div 
              className="flex justify-between items-center mb-4 cursor-pointer md:cursor-default"
              onClick={() => toggleSection('help')}
            >
              <h3 className="text-base font-medium">Help</h3>
              <span className="md:hidden transition-transform duration-200 transform" style={{ 
                transform: expandedSection === 'help' ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                ▼
              </span>
            </div>
            <ul className={`space-y-3 text-sm overflow-hidden transition-all duration-300 md:h-auto ${
              expandedSection === 'help' ? 'max-h-80' : 'md:max-h-80 max-h-0'
            }`}>
              <li><Link to="/customer-service" className="hover:underline">Customer Service</Link></li>
              <li><Link to="/shipping-returns" className="hover:underline">Shipping & Returns</Link></li>
              <li><Link to="/size-guide" className="hover:underline">Size Guide</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* About Column - Accordion on Mobile */}
          <div className="border-b md:border-b-0 pb-4 md:pb-0">
            <div 
              className="flex justify-between items-center mb-4 cursor-pointer md:cursor-default"
              onClick={() => toggleSection('about')}
            >
              <h3 className="text-base font-medium">About</h3>
              <span className="md:hidden transition-transform duration-200 transform" style={{ 
                transform: expandedSection === 'about' ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                ▼
              </span>
            </div>
            <ul className={`space-y-3 text-sm overflow-hidden transition-all duration-300 md:h-auto ${
              expandedSection === 'about' ? 'max-h-80' : 'md:max-h-80 max-h-0'
            }`}>
              <li><Link to="/about" className="hover:underline">Our Story</Link></li>
              <li><Link to="/sustainability" className="hover:underline">Sustainability</Link></li>
              <li><Link to="/taupe-on-you" className="hover:underline">Taupe on You</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
              <li><Link to="/press" className="hover:underline">Press</Link></li>
            </ul>
          </div>

          {/* Newsletter Column - Always expanded */}
          <div>
            <h3 className="text-base font-medium mb-4">Stay Connected</h3>
            <p className="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow p-2 text-sm border border-gray-300 focus:outline-none focus:border-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 text-sm"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-green-600 text-xs mt-2">Thank you for subscribing!</p>
              )}
            </form>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/taupe.brand/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div className="mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} Taupe. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy-policy" className="hover:text-black">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-black">Terms of Service</Link>
              <Link to="/accessibility" className="hover:text-black">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;