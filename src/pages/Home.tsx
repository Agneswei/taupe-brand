import React from 'react';
import { Link } from 'react-router-dom';
import homeImg from '../assets/home.png'; 

const Home: React.FC = () => {
  return (
    <section 
     className="relative h-[90vh] w-full bg-cover bg-center" 
     style={{ backgroundImage: `url(${homeImg})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Text */}
      <div className="relative z-10 h-full flex items-center justify-start pl-16">
      <div className="text-white">
  <h1 className="text-5xl font-light">Bare Essentials</h1>
  <h2 className="text-3xl font-light">2025 collection</h2>
  <Link
    to="/clothing?collection=Bare%20Essentials"
    className="mt-2 inline-block border border-white px-6 py-2 text-white hover:bg-white hover:text-black transition"
  >
    Shop Now
  </Link>
</div>
      </div>
    </section>
  );
};

export default Home;