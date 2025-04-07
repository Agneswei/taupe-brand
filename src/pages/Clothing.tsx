import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

// Helper function to get query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Clothing: React.FC = () => {
  const query = useQuery();
  const searchParam = query.get("search");
  
  const [category, setCategory] = useState("All");
  const [subcat, setSubcat] = useState("All");
  const [searchQuery, setSearchQuery] = useState(searchParam || "");

  // Update search query when URL param changes
  useEffect(() => {
    setSearchQuery(searchParam || "");
  }, [searchParam]);

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
    
    // Search filter
    const searchMatch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return catMatch && subMatch && searchMatch;
  });

  return (
    <div className="px-10 py-10">
      <h1 className="text-3xl font-light mb-6">All Clothing</h1>

      {/* Display search results message if searching */}
      {searchQuery && (
        <div className="mb-4 text-sm">
          <p>Search results for: <span className="font-medium">{searchQuery}</span></p>
          {filteredProducts.length === 0 ? (
            <p className="mt-2">No products found. Try a different search term.</p>
          ) : (
            <p className="mt-2">Found {filteredProducts.length} products</p>
          )}
        </div>
      )}

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