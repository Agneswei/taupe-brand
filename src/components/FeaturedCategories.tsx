import React from "react";
import { Link } from "react-router-dom";

type CategoryItem = {
  name: string;
  image: string;
  link: string;
};

const FeaturedCategories: React.FC = () => {
  const categories: CategoryItem[] = [
    {
      name: "Find", // tops
      image: "/categories/tops.jpg", 
      link: "/clothing?category=Tops"
    },
    {
      name: "Your", // bottoms
      image: "/categories/bottoms.jpg",
      link: "/clothing?category=Bottoms"
    },
    {
      name: "Everyday", // dresses
      image: "/categories/dress.jpg", 
      link: "/clothing?category=Dresses"
    },
    {
      name: "Essentials", // bags
      image: "/categories/bag.jpg",
      link: "/clothing?category=Bags"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Find Your Everyday Essentials</h2>
          <p className="text-gray-600 text-lg">Explore each main category</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative overflow-hidden bg-gray-100 aspect-[3/4] rounded-lg"
            >
              {/* Category Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to a placeholder if image doesn't exist
                  e.currentTarget.src = '/placeholder-category.jpg';
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              
              {/* Category Name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl md:text-2xl font-medium tracking-wide">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;