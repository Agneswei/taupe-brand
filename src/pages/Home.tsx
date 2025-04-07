import React from 'react';
import { Link } from 'react-router-dom';
import homeImg from '../assets/home.png'; 
import CollectionGrid from "../components/CollectionGrid";
import ProductScroller from "../components/ProductScroller";
import TaupeOnYouPreview from "../components/TaupeOnYouPreview";
import { products } from "../data/products";

const Home: React.FC = () => {
  const pickedForYou = products.slice(0, 8); 

const collectionSet1 = [
  {
    name: "Summer Mood SS24",
    image: "/collections/summermood.png",
    query: "Summer+Mood"
  },
  {
    name: "Ticket To Soho FW23",
    image: "/collections/TTS.png",
    query: "Ticket+To+Soho"
  },
  
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
const latestDrop = products.filter(p =>
  ["Lena Button Back Top", "Mira Cardigan", "Greta Wide Leg Pants", "Tricia Breathable Knit Tank"].includes(p.name)
);

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

      {/* Rest of content - Now outside the hero section */}
      <div>
      <CollectionGrid collections={collectionSet1} />
      <ProductScroller title="Latest Drop" products={latestDrop} />
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

