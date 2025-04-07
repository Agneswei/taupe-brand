import React from "react";
import { Link } from "react-router-dom";

type CollectionItem = {
  name: string;
  image: string;
  query: string;
};

const collections: CollectionItem[] = [
  {
    name: "Bare Essentials",
    image: "/collections/bareessentials.png",
    query: "Bare+Essentials"
  },
  {
    name: "Ticket To Soho",
    image: "/collections/TTS.png",
    query: "Ticket+To+Soho"
  },

  {
    name: "Summer Mood SS24",
    image: "/collections/summermood.png",
    query: "Summer+Mood"
  },
  {
    name: "Vie Elegante FW 23",
    image: "/collections/vieelegante.png",
    query: "Vie+Elegante"
  },
];

const CollectionGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-10">
      {collections.map((collection) => (
        <Link
          key={collection.name}
          to={`/clothing?collection=${collection.query}`}
          className="relative group h-[400px] overflow-hidden"
        >
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-4xl font-light tracking-wide text-center drop-shadow-lg">
              {collection.name}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CollectionGrid;
