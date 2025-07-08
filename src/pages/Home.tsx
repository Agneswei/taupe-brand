import React from 'react';
import { Link } from 'react-router-dom';
import homeImg from '../assets/home.jpg'; 
import CollectionGrid from "../components/CollectionGrid";
import ProductScroller from "../components/ProductScroller";
import TaupeOnYouPreview from "../components/TaupeOnYouPreview";
import FeaturedCategories from "../components/FeaturedCategories";
import { products } from "../data/products";

const Home: React.FC = () => {

const collectionSet1 = [
  {
    name: "Bare Essentials",
    image: "/collections/bareessentials.png",
    query: "Bare+Essentials"
  },
  {
    name: "Desk To Dinner",
    image: "/collections/dinner.png",
    query: "Desk+To+Dinner"
  },
  {
    name: "The Tailored",
    image: "/collections/tailored.jpg",  
    query: "The+Tailored",
    description: "Sophisticated tailoring for the modern professional"
  }
  
];

const collectionSet2 = [
  {
    name: "Vie Elegante FW 23",
    image: "/collections/vieelegante.png",
    query: "Vie+Elegante"
  },
 
];

const collectionSet3 = [
  {
    name: "From Desk",
    image: "/collections/desk.png",
    query: "To+Desk"
  },
  {
    name: "To Night",
    image: "/collections/dinner.png",
    query: "To+Night"
  },
];

const bestsellers = products.filter(p =>
  ["Chloe Top", "Jenny Top", "Luna Top", "Selina SKirt"].includes(p.name)
);

  return (
    <div>
      {/* Hero Section - Now just the hero, not containing other content */}
      <section 
        className="relative h-[90vh] w-full bg-cover bg-center" 
        style={{ backgroundImage: `url(${homeImg})` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Text */}
        <div className="relative z-10 h-full flex items-center justify-start pl-16">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Gigi's Favorite Collection - Effortless Elegance for Every Day</h1>
            <h2 className="text-3xl font-light mb-6">Mid Year Drop</h2>
            <Link
              to="/clothing?collection=Bare%20Essentials"
              className="mt-2 inline-block border border-white px-6 py-2 text-white hover:bg-white hover:text-black transition"
            >
              Shop The Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of content - Now outside the hero section */}
      <div>
        <CollectionGrid collections={collectionSet1} />
        <FeaturedCategories />
      </div>

      {/* Full-width second collection grid OUTSIDE the default container */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <CollectionGrid collections={collectionSet2} />
      </div>
      <ProductScroller title="" products={bestsellers} />

      <CollectionGrid collections={collectionSet3} />

      <div>
        <TaupeOnYouPreview />
      </div>

    </div>
  );
};

export default Home;