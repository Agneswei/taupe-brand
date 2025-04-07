import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

const Clothing: React.FC = () => {
  const [searchParams] = useSearchParams();
  const collectionParam = searchParams.get("collection");
  const searchParam = searchParams.get("search");
  const categoryParam = searchParams.get("category");
  const subcategoryParam = searchParams.get("subcategory");

  const [category, setCategory] = useState("All");
  const [subcat, setSubcat] = useState("All");
  const [searchQuery, setSearchQuery] = useState(searchParam || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update filters when URL params change
  useEffect(() => {
    setSearchQuery(searchParam || "");
    if (categoryParam) setCategory(categoryParam);
    if (subcategoryParam) {
      setSubcat(subcategoryParam.replace(/\+/g, " ").replace(/%26/g, "&"));
    }
  }, [searchParam, categoryParam, subcategoryParam]);

  // Generate subcategories dynamically for selected category
  const subcategories = Array.from(
    new Set(
      products
        .filter((p) => p.category === category && p.subcategory)
        .map((p) => p.subcategory!)
    )
  );

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesSubcategory = subcat === "All" || product.subcategory === subcat;
    
    // Handle collection display
    let matchesCollection = true;
    if (collectionParam) {
      // For collections in the URL, match by the collection name
      matchesCollection = product.collection === collectionParam.replace(/\+/g, " ");
    }

    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.collection && product.collection.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSubcategory && matchesCollection && matchesSearch;
  });

  // Get page title based on parameters
  const getPageTitle = () => {
    if (collectionParam) {
      return `${collectionParam.replace(/\+/g, " ")}`;
    } else if (category !== "All") {
      return subcat !== "All" ? `${category} - ${subcat}` : category;
    } else {
      return "All Clothing";
    }
  };

  return (
    <div className="px-10 py-10">
      <h1 className="text-3xl font-light mb-6">{getPageTitle()}</h1>

      {/* Only show search results message when explicitly searching, not for collections */}
      {searchParam && !collectionParam && (
        <div className="mb-4 text-sm">
          <p>
            Search results for: <span className="font-medium">{searchQuery}</span>
          </p>
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