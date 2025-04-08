import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CurrencySelector from './CurrencySelector';

// SVG for Search Icon 
const SearchIconSVG = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// Cart icon component
const CartIconSVG = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

// Menu icon component
const MenuIconSVG = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// Close icon component
const CloseIconSVG = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [showClothingDropdown, setShowClothingDropdown] = useState(false);
  const [showAccessoriesDropdown, setShowAccessoriesDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Create refs for the dropdown elements
  const clothingDropdownRef = useRef<HTMLLIElement>(null);
  const accessoriesDropdownRef = useRef<HTMLLIElement>(null);
  
  // Add a timeout to prevent the dropdown from closing immediately
  let clothingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  let accessoriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
    setMobileSection(null);
  }, [navigate]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or filter current page
      navigate(`/clothing?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  // Handle clicks outside of dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (clothingDropdownRef.current && !clothingDropdownRef.current.contains(event.target as Node)) {
        setShowClothingDropdown(false);
      }
      if (accessoriesDropdownRef.current && !accessoriesDropdownRef.current.contains(event.target as Node)) {
        setShowAccessoriesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  // Functions to handle mouseEnter and mouseLeave with delay
  const handleClothingMouseEnter = () => {
    if (clothingTimeoutRef.current) {
      clearTimeout(clothingTimeoutRef.current);
      clothingTimeoutRef.current = null;
    }
    setShowClothingDropdown(true);
  };

  const handleClothingMouseLeave = () => {
    clothingTimeoutRef.current = setTimeout(() => {
      setShowClothingDropdown(false);
    }, 300); 
  };

  const handleAccessoriesMouseEnter = () => {
    if (accessoriesTimeoutRef.current) {
      clearTimeout(accessoriesTimeoutRef.current);
      accessoriesTimeoutRef.current = null;
    }
    setShowAccessoriesDropdown(true);
  };

  const handleAccessoriesMouseLeave = () => {
    accessoriesTimeoutRef.current = setTimeout(() => {
      setShowAccessoriesDropdown(false);
    }, 300); 
  };

  // New function to handle dropdown link clicks
  const handleDropdownLinkClick = () => {
    // Immediately close both dropdowns when a link is clicked
    setShowClothingDropdown(false);
    setShowAccessoriesDropdown(false);
    setShowMobileMenu(false);
    setMobileSection(null);
  };

  const toggleMobileSection = (section: string) => {
    if (mobileSection === section) {
      setMobileSection(null);
    } else {
      setMobileSection(section);
    }
  };

  return (
    <nav className="relative w-full bg-white text-black px-4 sm:px-6 md:px-10 py-4 flex justify-between items-center shadow-sm text-sm tracking-wide font-light sticky top-0 z-50">
      {/* Left - Logo with Link to Home */}
      <Link to="/" className="text-2xl font-extralight tracking-widest z-10">TAUPE</Link>

      {/* Mobile Menu Button - Only visible on small screens */}
      <button
        className="md:hidden z-10"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        aria-label="Toggle mobile menu"
      >
        {showMobileMenu ? <CloseIconSVG /> : <MenuIconSVG />}
      </button>

      {/* Center - Navigation - Hidden on mobile */}
      <ul className="hidden md:flex gap-6 justify-center flex-1 max-w-2xl">
        {/* Clothing */}
        <li
          className="relative hover:underline cursor-pointer"
          onMouseEnter={handleClothingMouseEnter}
          onMouseLeave={handleClothingMouseLeave}
          ref={clothingDropdownRef}
        >
          <Link to="/clothing">Clothing</Link>

          {showClothingDropdown && (
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4 w-[700px] bg-white text-black p-6 shadow-xl grid grid-cols-2 gap-6 z-50 rounded-lg"
              onMouseEnter={handleClothingMouseEnter}
              onMouseLeave={handleClothingMouseLeave}
            >
              <div>
                <h4 className="font-semibold mb-2">Categories</h4>
                <ul className="space-y-1">
                  <li><Link to="/clothing" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">All Clothing</Link></li>
                  <li><Link to="/clothing?category=Tops&subcategory=Tank+Tops" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Tank Tops</Link></li>
                  <li><Link to="/clothing?category=Tops&subcategory=Shirts+%26+Blouses" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Shirts & Blouses</Link></li>
                  <li><Link to="/clothing?category=Tops&subcategory=T-Shirts" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">T-Shirts</Link></li>
                  <li><Link to="/clothing?category=Tops&subcategory=Cardigans+%26+Sweaters" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Cardigans | Sweaters</Link></li>
                  <li><Link to="/clothing?category=Outerwear" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Outerwear</Link></li>
                  <li><Link to="/clothing?category=Bottoms&subcategory=Pants" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Pants</Link></li>
                  <li><Link to="/clothing?category=Dresses" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Dresses</Link></li>
                  <li><Link to="/clothing?category=Bottoms&subcategory=Skirts" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Skirts</Link></li>
                  <li><Link to="/clothing?category=Bottoms&subcategory=Shorts" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Shorts</Link></li>
                  <li><Link to="/clothing?category=Sets" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Sets</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Collections</h4>
                <ul className="space-y-1">
                  <li><Link to="/clothing?search=Be+That+Light" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Be That Light</Link></li>
                  <li><Link to="/clothing?search=Bare+Essentials" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Bare Essentials SS25</Link></li>
                  <li><Link to="/clothing?search=Desk+To+Dinner" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Desk To Dinner</Link></li>
                  <li><Link to="/clothing?search=Summer+Mood" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Summer Mood SS24</Link></li>
                  <li><Link to="/clothing?search=The+Tailored" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">The Tailored FW24</Link></li>
                  <li><Link to="/clothing?search=Vie+Elegante" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Vie Elegante FW23</Link></li>
                </ul>
              </div>
            </div>
          )}
        </li>

        {/* Accessories */}
        <li
          className="relative hover:underline cursor-pointer"
          onMouseEnter={handleAccessoriesMouseEnter}
          onMouseLeave={handleAccessoriesMouseLeave}
          ref={accessoriesDropdownRef}
        >
          <Link to="/accessories">Accessories</Link>

          {showAccessoriesDropdown && (
            <div 
              className="absolute left-0 transform top-full mt-4 w-[500px] bg-white text-black p-6 shadow-xl grid grid-cols-2 gap-6 z-50 rounded-lg"
              onMouseEnter={handleAccessoriesMouseEnter}
              onMouseLeave={handleAccessoriesMouseLeave}
            >
              <div>
                <h4 className="font-semibold mb-2">Categories</h4>
                <ul className="space-y-1">
                  <li><Link to="/accessories" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">All Accessories</Link></li>
                  <li><Link to="/accessories?category=Bags" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Bags</Link></li>
                  <li><Link to="/accessories?category=Hats" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Belts</Link></li>

                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Style Picks</h4>
                <ul className="space-y-1">
                  <li><Link to="/accessories?search=Minimalist+Staples" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Minimalist Staples</Link></li>
                  <li><Link to="/accessories?search=Color+Pop" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Color Pop</Link></li>
                  <li><Link to="/accessories?search=Pauline+Favorites" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Pauline's Favorites</Link></li>
                </ul>
              </div>
            </div>
          )}
        </li>

        <li className="hover:underline cursor-pointer">
          <Link to="/featured">Featured</Link>
        </li>
      </ul>

      {/* Right - Icons */}
      <div className="flex gap-4 items-center z-10">
        {/* Currency Selector - Added here */}
        <CurrencySelector />
        
        {/* Search Button */}
        <button 
          title="Search" 
          onClick={() => setShowSearch(!showSearch)}
          className="relative"
        >
          <SearchIconSVG />
        </button>
        
        {/* Cart Button with Item Count */}
        <Link 
          to="/cart" 
          className="relative hover:opacity-70 transition"
          title="Cart"
        >
          <CartIconSVG />
          {cart.totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.totalItems}
            </span>
          )}
        </Link>
        
        <button className="text-xs underline hidden md:block">Sign In</button>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-white z-40 overflow-y-auto pt-20 pb-6 px-6">
          <button 
            onClick={() => setShowMobileMenu(false)} 
            className="absolute top-6 right-6 text-2xl font-light"
            aria-label="Close menu"
          >
            ✕
          </button>
          <div className="flex flex-col h-full">
            <div className="flex-1">
              {/* Currency Selector in Mobile Menu */}
              <div className="mb-6 flex justify-between items-center">
                <span className="text-gray-500 text-sm uppercase">Currency</span>
                <CurrencySelector />
              </div>
            
              {/* Mobile Navigation */}
              <ul className="text-xl space-y-6">
                {/* Clothing */}
                <li>
                  <div 
                    className="flex justify-between items-center"
                    onClick={() => toggleMobileSection('clothing')}
                  >
                    <span>Clothing</span>
                    <span className={`transition-transform ${mobileSection === 'clothing' ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                  
                  {mobileSection === 'clothing' && (
                    <div className="mt-4 ml-4 space-y-4">
                      <div className="mb-6">
                        <h4 className="font-medium mb-2 text-gray-500 text-sm uppercase">Categories</h4>
                        <ul className="space-y-3">
                          <li><Link to="/clothing" onClick={handleDropdownLinkClick}>All Clothing</Link></li>
                          <li><Link to="/clothing?category=Tops" onClick={handleDropdownLinkClick}>Tops</Link></li>
                          <li><Link to="/clothing?category=Bottoms" onClick={handleDropdownLinkClick}>Bottoms</Link></li>
                          <li><Link to="/clothing?category=Dresses" onClick={handleDropdownLinkClick}>Dresses</Link></li>
                          <li><Link to="/clothing?category=Outerwear" onClick={handleDropdownLinkClick}>Outerwear</Link></li>
                          <li><Link to="/clothing?category=Sets" onClick={handleDropdownLinkClick}>Sets</Link></li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-gray-500 text-sm uppercase">Collections</h4>
                        <ul className="space-y-3">
                        <li><Link to="/clothing?search=Be+That+Light" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Be That Light</Link></li>
                  <li><Link to="/clothing?search=Bare+Essentials" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Bare Essentials SS25</Link></li>
                  <li><Link to="/clothing?search=Desk+To+Dinner" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Desk To Dinner</Link></li>
                  <li><Link to="/clothing?search=Summer+Mood" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Summer Mood SS24</Link></li>
                  <li><Link to="/clothing?search=The+Tailored" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">The Tailored FW24</Link></li>
                  <li><Link to="/clothing?search=Vie+Elegante" onClick={handleDropdownLinkClick} className="block py-1 hover:text-gray-500">Vie Elegante FW 23</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
                
                {/* Accessories */}
                <li>
                  <div 
                    className="flex justify-between items-center"
                    onClick={() => toggleMobileSection('accessories')}
                  >
                    <span>Accessories</span>
                    <span className={`transition-transform ${mobileSection === 'accessories' ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                  
                  {mobileSection === 'accessories' && (
                    <div className="mt-4 ml-4 space-y-4">
                      <div className="mb-6">
                        <h4 className="font-medium mb-2 text-gray-500 text-sm uppercase">Categories</h4>
                        <ul className="space-y-3">
                          <li><Link to="/accessories" onClick={handleDropdownLinkClick}>All Accessories</Link></li>
                          <li><Link to="/accessories?category=Bags" onClick={handleDropdownLinkClick}>Bags</Link></li>
                          <li><Link to="/accessories?category=Hats" onClick={handleDropdownLinkClick}>Belts</Link></li>
             
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-gray-500 text-sm uppercase">Collections</h4>
                        <ul className="space-y-3">
                          <li><Link to="/accessories?search=Minimalist+Staples" onClick={handleDropdownLinkClick}>Minimalist Staples</Link></li>
                          <li><Link to="/accessories?search=Color+Pop" onClick={handleDropdownLinkClick}>Color Pop</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
                
                {/* Featured */}
                <li>
                  <Link to="/featured" onClick={handleDropdownLinkClick}>Featured</Link>
                </li>
                
                {/* Taupe on You */}
                <li>
                  <Link to="/taupe-on-you" onClick={handleDropdownLinkClick}>Taupe on You</Link>
                </li>
              </ul>
            </div>
            
            {/* Mobile Footer Links */}
            <div className="mt-auto pt-8 border-t border-gray-200">
              <ul className="space-y-3 text-sm">
                <li><button className="hover:underline">Sign In / Register</button></li>
                <li><Link to="/about" onClick={handleDropdownLinkClick} className="hover:underline">About Us</Link></li>
                <li><Link to="/contact" onClick={handleDropdownLinkClick} className="hover:underline">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {showSearch && (
        <div className="absolute inset-0 bg-white z-50 flex items-center px-10">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 py-2 border-b-2 border-gray-300 focus:border-black outline-none pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="button" onClick={() => setShowSearch(false)} className="ml-4">
                ✕
              </button>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;