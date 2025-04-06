import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="text-2xl font-semibold tracking-widest">TAUPE</div>
      <ul className="flex gap-6 text-sm font-medium">
        <li><a href="#">Clothing</a></li>
        <li><a href="#">Accessories</a></li>
        <li><a href="#">Featured</a></li>
      </ul>
      <div className="flex items-center gap-4 text-sm">
        <button>🔍</button>
        <button>Sign In</button>
        <button>🛒</button>
      </div>
    </nav>
  );
};

export default Navbar;
