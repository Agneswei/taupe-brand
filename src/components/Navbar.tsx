import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
  const [showClothingDropdown, setShowClothingDropdown] = useState(false);
  const [showAccessoriesDropdown, setShowAccessoriesDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or filter current page
      navigate(`/clothing?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
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
          onMouseEnter={() => setShowClothingDropdown(true)}
          onMouseLeave={() => setShowClothingDropdown(false)}
        >
          <Link to="/clothing">Clothing</Link>

          {showClothingDropdown && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4 w-[700px] bg-white text-black p-6 shadow-xl grid grid-cols-2 gap-6 z-50 rounded-lg">
              <div>
                <h4 className="font-semibold mb-2">Categories</h4>
                <ul className="space-y-1">
                  <li>All Clothing</li>
                  <li>Tops</li>
                  <li>Sleeveless</li>
                  <li>Cardigans</li>
                  <li>Dresses</li>
                  <li>Skirts</li>
                  <li>Shorts</li>
                  <li>Pants</li>
                  <li>Sets</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Collections</h4>
                <ul className="space-y-1">
                  <li>Be That Light</li>
                  <li>Bare Essentials SS25</li>
                  <li>Summer Mood SS24</li>
                </ul>
              </div>
            </div>
          )}
        </li>

        {/* Accessories */}
        <li
          className="relative hover:underline cursor-pointer"
          onMouseEnter={() => setShowAccessoriesDropdown(true)}
          onMouseLeave={() => setShowAccessoriesDropdown(false)}
        >
          <span>Accessories</span>

          {showAccessoriesDropdown && (
            <div className="absolute left-0 transform top-full mt-4 w-[500px] bg-white text-black p-6 shadow-xl grid grid-cols-2 gap-6 z-50 rounded-lg">
              <div>
                <h4 className="font-semibold mb-2">Categories</h4>
                <ul className="space-y-1">
                  <li>All Accessories</li>
                  <li>Bags</li>
                  <li>Hats</li>
                  <li>Scarves</li>
                  <li>Socks</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Style Picks</h4>
                <ul className="space-y-1">
                  <li>Minimalist Staples</li>
                  <li>Color Pop</li>
                  <li>Soft Textures</li>
                </ul>
              </div>
            </div>
          )}
        </li>

        <li className="hover:underline cursor-pointer">Featured</li>
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
        <button 
          title="Cart" 
          className="relative hover:opacity-70 transition"
        >
          <CartIconSVG />
        </button>
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