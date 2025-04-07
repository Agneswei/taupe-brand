import React from "react";

type FilterBarProps = {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedSub: string;
  onSelectSub: (sub: string) => void;
  subcategories: string[];
};

const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Sets"];

const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSub,
  onSelectSub,
  subcategories,
}) => {
  return (
    <div className="space-y-4 mb-10">
      {/* Main Categories */}
      <div className="flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1 rounded-full border text-sm ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "border-black text-black"
            }`}
            onClick={() => {
              onSelectCategory(cat);
              onSelectSub("All"); // Reset subcategory
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subcategories (only if category has them) */}
      {subcategories.length > 0 && (
        <div className="flex gap-2 flex-wrap text-xs">
          <button
            onClick={() => onSelectSub("All")}
            className={`px-3 py-1 border rounded-full ${
              selectedSub === "All"
                ? "bg-black text-white"
                : "border-black text-black"
            }`}
          >
            All
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => onSelectSub(sub)}
              className={`px-3 py-1 border rounded-full ${
                selectedSub === sub
                  ? "bg-black text-white"
                  : "border-black text-black"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
