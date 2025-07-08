import React from "react";
import { Link } from "react-router-dom";

type CollectionItem = {
  name: string;
  image: string;
  query: string;
  description?: string;
};

type Props = {
  collections: CollectionItem[];
  layout?: 'default' | 'side-by-side' | 'featured';
};

const CollectionGrid: React.FC<Props> = ({ collections, layout = 'default' }) => {
  // Default layout (original functionality)
  if (layout === 'default') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {collections.map((collection) => (
          <Link
            key={collection.name}
            to={`/clothing?collection=${collection.query}`}
            className="relative group h-[400px] overflow-hidden"
          >
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-light mb-4">{collection.name}</h3>
                <span className="inline-block border border-white px-6 py-2 text-white hover:bg-white hover:text-black transition">
                  Shop the Collection
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  // Side-by-side layout for main collections (like Bare Essentials & Desk to Dinner)
  if (layout === 'side-by-side') {
    return (
      <div>
        {/* First two collections side by side - contained */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {collections.slice(0, 2).map((collection) => (
              <div key={collection.name} className="text-center">
                {/* Image Container */}
                <div className="relative group mb-6 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Collection Info */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-light">{collection.name}</h3>
                  {collection.description && (
                    <p className="text-gray-600 text-sm max-w-md mx-auto">
                      {collection.description}
                    </p>
                  )}
                  <Link
                    to={`/clothing?collection=${collection.query}`}
                    className="inline-block border border-black px-8 py-3 text-black hover:bg-black hover:text-white transition font-medium tracking-wide text-sm uppercase"
                  >
                    Shop the Collection
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Third collection (The Tailored) - full viewport width */}
        {collections[2] && (
          <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
            <div className="relative group overflow-hidden">
              <img
                src={collections[2].image}
                alt={collections[2].name}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay for text */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-light mb-4">{collections[2].name}</h3>
                  <Link
                    to={`/clothing?collection=${collections[2].query}`}
                    className="inline-block border border-white px-8 py-3 text-white hover:bg-white hover:text-black transition font-medium tracking-wide text-sm uppercase"
                  >
                    Shop the Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Featured layout for special collections
  if (layout === 'featured') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {collections.map((collection) => (
          <div key={collection.name} className="relative group h-[600px] overflow-hidden">
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Content positioned at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-light mb-4">{collection.name}</h3>
              {collection.description && (
                <p className="text-lg mb-6 opacity-90">
                  {collection.description}
                </p>
              )}
              <Link
                to={`/clothing?collection=${collection.query}`}
                className="inline-block border border-white px-8 py-3 text-white hover:bg-white hover:text-black transition font-medium tracking-wide text-sm uppercase"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default CollectionGrid;