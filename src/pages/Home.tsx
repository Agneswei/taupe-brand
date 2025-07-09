import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CollectionGrid from "../components/CollectionGrid";
import ProductScroller from "../components/ProductScroller";
import TaupeOnYouPreview from "../components/TaupeOnYouPreview";
import FeaturedCategories from "../components/FeaturedCategories";
import { products } from "../data/products";

const Home: React.FC = () => {
  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroImages = [
    "/hero/gigi1.jpg", 
    "/hero/gigi2.jpg",
    "/hero/gigi3.jpg"
  ];

  const heroContent = {
    title: "Gigi's Favorite Collection - Effortless Elegance for Every Day",
    subtitle: "Mid Year Drop",
    buttonText: "Shop The Collection",
    buttonLink: "/clothing?collection=Gigi%27s+Favorite+Collection"
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroImages.length]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const collectionSet1 = [
    {
      name: "Bare Essentials",
      image: "/collections/bareessentials.png",
      query: "Bare+Essentials"
    },
    {
      name: "Desk To Dinner",
      image: "/collections/dinner.png",
      query: "Romance+Mansion"
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
      {/* Hero Carousel Section */}
      <section 
        className="relative h-[90vh] w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides Container */}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroImages.map((image, index) => (
            <div
              key={index}
              className="min-w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
          ))}
        </div>

        {/* Static Text Content - Always visible */}
        <div className="absolute inset-0 z-10 flex items-center justify-start pl-16">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">
              {heroContent.title}
            </h1>
            <h2 className="text-3xl font-light mb-6">
              {heroContent.subtitle}
            </h2>
            <Link
              to={heroContent.buttonLink}
              className="inline-block border border-white px-6 py-2 text-white hover:bg-white hover:text-black transition duration-300"
            >
              {heroContent.buttonText}
            </Link>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-300 z-20"
          aria-label="Previous slide"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-300 z-20"
          aria-label="Next slide"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20 z-20">
          <div 
            className="h-full bg-white transition-all duration-300"
            style={{ 
              width: `${((currentSlide + 1) / heroImages.length) * 100}%` 
            }}
          />
        </div>
      </section>

      {/* Rest of content */}
      <div>
        <CollectionGrid collections={collectionSet1} />
        <FeaturedCategories />
      </div>

      {/* Full-width second collection grid */}
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