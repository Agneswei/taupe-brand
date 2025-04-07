import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [showClothingDropdown, setShowClothingDropdown] = useState(false);
  const [showAccessoriesDropdown, setShowAccessoriesDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Create refs for the dropdown elements
  const clothingDropdownRef = useRef<HTMLLIElement>(null);
  const accessoriesDropdownRef = useRef<HTMLLIElement>(null);
  
  // Add a timeout to prevent the dropdown from closing immediately
  let clothingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  let accessoriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <nav className="relative w-full bg-white text-black px-10 py-4 flex justify-between items-center shadow-sm text-sm tracking-wide font-light sticky top-0 z-50">
      {/* Left - Logo with Link to Home */}
      <Link to="/" className="text-2xl font-extralight tracking-widest">TAUPE</Link>

      {/* Center - Navigation */}
      <ul className="flex gap-6 justify-center flex-1 max-w-2xl">
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
                  <li><Link to="/clothing" className="block py-1 hover:text-gray-500">All Clothing</Link></li>
                  <li><Link to="/clothing?category=Tops&subcategory=Tank+Tops" className="block py-1 hover:text-gray-500">Tank Tops</Link></li>
                  <li><Link to="/clothing?category=Tops&subcategory=Shirts+%26+Blouses" className="block py-1 hover:text-gray-500">Shirts & Blouses</Link></li>
                  <li><Link to="/clothing?category=Tops&subcategory=T-Shirts" className="block py-1 hover:text-gray-500">T-Shirts</Link></li>
                  <li><Link to="/clothing?category=Tops&subcategory=Cardigans+%26+Sweaters" className="block py-1 hover:text-gray-500">Cardigans | Sweaters</Link></li>
                  <li><Link to="/clothing?category=Outerwear" className="block py-1 hover:text-gray-500">Outerwear</Link></li>
                  <li><Link to="/clothing?category=Bottoms&subcategory=Pants" className="block py-1 hover:text-gray-500">Pants</Link></li>
                  <li><Link to="/clothing?category=Dresses" className="block py-1 hover:text-gray-500">Dresses</Link></li>
                  <li><Link to="/clothing?category=Bottoms&subcategory=Skirts" className="block py-1 hover:text-gray-500">Skirts</Link></li>
                  <li><Link to="/clothing?category=Bottoms&subcategory=Shorts" className="block py-1 hover:text-gray-500">Shorts</Link></li>
                  <li><Link to="/clothing?category=Sets" className="block py-1 hover:text-gray-500">Sets</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Collections</h4>
                <ul className="space-y-1">
                  <li><Link to="/clothing?search=Be+That+Light" className="block py-1 hover:text-gray-500">Be That Light</Link></li>
                  <li><Link to="/clothing?search=Bare+Essentials" className="block py-1 hover:text-gray-500">Bare Essentials SS25</Link></li>
                  <li><Link to="/clothing?search=Desk+To+Dinner" className="block py-1 hover:text-gray-500">Desk To Dinner</Link></li>
                  <li><Link to="/clothing?search=Summer+Mood" className="block py-1 hover:text-gray-500">Summer Mood SS24</Link></li>
                  <li><Link to="/clothing?search=The+Tailored" className="block py-1 hover:text-gray-500">The Tailored FW24</Link></li>
                  <li><Link to="/clothing?search=Vie+Elegante" className="block py-1 hover:text-gray-500">Vie Elegante FW 23</Link></li>
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
          <span>Accessories</span>

          {showAccessoriesDropdown && (
            <div 
              className="absolute left-0 transform top-full mt-4 w-[500px] bg-white text-black p-6 shadow-xl grid grid-cols-2 gap-6 z-50 rounded-lg"
              onMouseEnter={handleAccessoriesMouseEnter}
              onMouseLeave={handleAccessoriesMouseLeave}
            >
              <div>
                <h4 className="font-semibold mb-2">Categories</h4>
                <ul className="space-y-1">
                  <li><Link to="/accessories" className="block py-1 hover:text-gray-500">All Accessories</Link></li>
                  <li><Link to="/accessories?search=Bags" className="block py-1 hover:text-gray-500">Bags</Link></li>
                  <li><Link to="/accessories?search=Hats" className="block py-1 hover:text-gray-500">Hats</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Style Picks</h4>
                <ul className="space-y-1">
                  <li><Link to="/accessories?search=Minimalist+Staples" className="block py-1 hover:text-gray-500">Minimalist Staples</Link></li>
                  <li><Link to="/accessories?search=Color+Pop" className="block py-1 hover:text-gray-500">Color Pop</Link></li>
                  <li><Link to="/accessories?search=Pauline+Favorites" className="block py-1 hover:text-gray-500">Pauline's Favorites</Link></li>
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
      <div className="flex gap-4 items-center">
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
        
        <button className="text-xs underline">Sign In</button>
      </div>

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