// src/components/TaupeOnYouPreview.tsx
import React from "react";
import { Link } from "react-router-dom";

const TaupeOnYouPreview: React.FC = () => {
  // Sample featured images with usernames
  const featuredImages = [
    { 
      imageUrl: "/taupe-on-you/1.png", 
      username: "@olivia.style" 
    },
    { 
      imageUrl: "/taupe-on-you/8.png", 
      username: "@zoe_outfits" 
    }
  ];

  return (
    <section className="my-12 px-6 text-center">
      <Link
        to="/taupe-on-you"
        className="inline-block mb-6 text-xl font-medium hover:text-gray-600 transition"
      >
        Taupe on You
      </Link>

      <div className="grid grid-cols-2 gap-4">
        {featuredImages.map((image, idx) => (
          <Link key={idx} to="/taupe-on-you" className="relative group overflow-hidden block">
            <div className="aspect-square overflow-hidden">
              <img 
                src={image.imageUrl} 
                alt={`TAUPE styled by ${image.username}`} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
              {image.username}
            </div>
          </Link>
        ))}
      </div>
      
      <Link 
        to="/taupe-on-you" 
        className="inline-block mt-6 border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition"
      >
        View All
      </Link>
    </section>
  );
};

export default TaupeOnYouPreview;