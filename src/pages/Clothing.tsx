import React, { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

const Clothing: React.FC = () => {
  const [category, setCategory] = useState("All");
  const [subcat, setSubcat] = useState("All");

  // Get unique subcategories for the selected category
  const subcategories = Array.from(
    new Set(
      products
        .filter((p) => p.category === category && p.subcategory)
        .map((p) => p.subcategory!)
    )
  );

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const catMatch = category === "All" || product.category === category;
    const subMatch =
      subcat === "All" || product.subcategory === subcat || !product.subcategory;
    return catMatch && subMatch;
  });

  return (
    <div className="px-10 py-10">
      <h1 className="text-3xl font-light mb-6">All Clothing</h1>

      <FilterBar
        selectedCategory={category}
        onSelectCategory={setCategory}
        selectedSub={subcat}
        onSelectSub={setSubcat}
        subcategories={subcategories}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Clothing;
