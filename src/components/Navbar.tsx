import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [showClothingDropdown, setShowClothingDropdown] = React.useState(false);
  const [showAccessoriesDropdown, setShowAccessoriesDropdown] = React.useState(false);

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
        <button title="Search">🔍</button>
        <button title="Cart">🛍️</button>
        <button className="text-xs underline">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;