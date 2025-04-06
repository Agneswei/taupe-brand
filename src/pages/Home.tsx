import React from 'react';

const Home: React.FC = () => {
  return (
    <section className="h-[90vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://via.placeholder.com/1600x900')" }}>
      <div className="bg-black bg-opacity-40 p-8 rounded-lg text-center">
        <h1 className="text-5xl font-light mb-4">Taupe SS25 Drop</h1>
        <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">Shop Now</button>
      </div>
    </section>
  );
};

export default Home;
