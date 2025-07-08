import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { accessories } from "../data/accessories";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

const Accessories: React.FC = () => {
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
    if (categoryParam) {
      setCategory(categoryParam);
    } else {
      setCategory("All");
    }
    if (subcategoryParam) {
      setSubcat(subcategoryParam.replace(/\+/g, " ").replace(/%26/g, "&"));
    } else {
      setSubcat("All");
    }
  }, [searchParam, categoryParam, subcategoryParam]);

  // Generate categories dynamically from the accessories data
  const categories = ["All", ...Array.from(new Set(accessories.map(a => a.category)))];

  // Generate subcategories dynamically for selected category
  const subcategories = Array.from(
    new Set(
      accessories
        .filter((a) => (category === "All" || a.category === category) && a.subcategory)
        .map((a) => a.subcategory!)
    )
  );

  // Filter logic
  const filteredAccessories = accessories.filter((accessory) => {
    const matchesCategory = category === "All" || accessory.category === category;
    const matchesSubcategory = subcat === "All" || accessory.subcategory === subcat;
    
    // Handle collection display
    let matchesCollection = true;
    if (collectionParam) {
      // For collections in the URL, match by the collection name
      matchesCollection = accessory.collection === collectionParam.replace(/\+/g, " ");
    }

    const matchesSearch =
      !searchQuery ||
      accessory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      accessory.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (accessory.subcategory && accessory.subcategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (accessory.collection && accessory.collection.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSubcategory && matchesCollection && matchesSearch;
  });

  // Get page title based on parameters
  const getPageTitle = () => {
    if (collectionParam) {
      return `${collectionParam.replace(/\+/g, " ")}`;
    } else if (category !== "All") {
      return subcat !== "All" ? `${category} - ${subcat}` : category;
    } else {
      return "All Accessories";
    }
  };

  // Reset subcategory when category changes
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSubcat("All"); // Reset subcategory when category changes
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
          {filteredAccessories.length === 0 ? (
            <p className="mt-2">No accessories found. Try a different search term.</p>
          ) : (
            <p className="mt-2">Found {filteredAccessories.length} accessories</p>
          )}
        </div>
      )}

      <FilterBar
        selectedCategory={category}
        onSelectCategory={handleCategoryChange}
        selectedSub={subcat}
        onSelectSub={setSubcat}
        subcategories={subcategories}
        categories={categories}
      />

      {filteredAccessories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No accessories found for the selected filters.</p>
          <button 
            onClick={() => {
              setCategory("All");
              setSubcat("All");
              setSearchQuery("");
            }}
            className="mt-4 text-sm underline hover:no-underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {filteredAccessories.map((accessory) => (
            <ProductCard key={accessory.id} product={accessory} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Accessories;
