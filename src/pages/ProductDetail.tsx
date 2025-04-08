import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

type ProductColor = {
  name: string;
  code: string;
  image: string;
  additionalImages?: string[]; // New field for additional images
}

type ProductVariant = {
  colors?: ProductColor[];
  sizes?: string[];
}

type ExtendedProduct = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  subcategory?: string;
  variants?: ProductVariant;
  additionalImages?: string[]; // Product-level additional images
};

const getProductWithVariants = (product: any): ExtendedProduct => {
  if (product.variants) {
    return product as ExtendedProduct;
  }

  // Default variants based on product category
  let defaultVariant: ProductVariant = {
    colors: [
      { name: "Default", code: "#888888", image: product.image }
    ],
    sizes: ["S", "M", "L"]
  };

  // Customize defaults based on product category
  if (product.category === "Tops") {
    defaultVariant.sizes = ["XS", "S", "M", "L", "XL"];
    
    if (product.subcategory === "Tank Tops") {
      defaultVariant.colors = [
        { name: "Black", code: "#222222", image: product.image },
        { name: "White", code: "#ffffff", image: product.image.replace("black", "white") },
      ];
    }
  } 
  else if (product.category === "Pants") {
    defaultVariant.sizes = ["0", "2", "4", "6", "8", "10", "12", "14"];
  }

  // Return a new object with the default variants added
  return {
    ...product,
    variants: defaultVariant
  };
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<ExtendedProduct | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isSizeError, setIsSizeError] = useState(false);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [hasTrendingColors, setHasTrendingColors] = useState(false);
  const [quantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const productId = Number(id);
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      const productWithVariants = getProductWithVariants(foundProduct);
      setProduct(productWithVariants);
      
      if (productWithVariants.variants) {
        // Initialize with the first color's images
        if (productWithVariants.variants.colors && productWithVariants.variants.colors.length > 0) {
          const firstColor = productWithVariants.variants.colors[0];
          setSelectedColor(firstColor);
          
          // Combine main image with additional images for this color
          const colorImages = [firstColor.image];
          if (firstColor.additionalImages) {
            colorImages.push(...firstColor.additionalImages);
          }
          
          // Add product-level additional images if present
          if (productWithVariants.additionalImages) {
            colorImages.push(...productWithVariants.additionalImages);
          }
          
          setAllImages(colorImages);
        } else {
          // Fallback to product image if no colors
          const productImages = [productWithVariants.image];
          if (productWithVariants.additionalImages) {
            productImages.push(...productWithVariants.additionalImages);
          }
          setAllImages(productImages);
        }
        
        setHasTrendingColors(
          productWithVariants.variants.colors ? 
          productWithVariants.variants.colors.length >= 2 : 
          false
        );
      }
    }
  }, [id]);

  // Update the image array when a color is selected
  useEffect(() => {
    if (selectedColor && product) {
      // Create a new array of images starting with the main image for this color
      const colorImages = [selectedColor.image];
      
      // Add any additional images specific to this color
      if (selectedColor.additionalImages) {
        colorImages.push(...selectedColor.additionalImages);
      }
      
      // Add product-level additional images if present
      if (product.additionalImages) {
        colorImages.push(...product.additionalImages);
      }
      
      setAllImages(colorImages);
      setCurrentImageIndex(0); // Reset to first image when color changes
    }
  }, [selectedColor, product]);

  // If product is not found or still loading
  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setIsSizeError(true);
      return;
    }
    
    // Add the product to the cart
    addToCart(
      product, 
      selectedSize, 
      quantity, 
      selectedColor ? selectedColor.name : undefined
    );
    
    // Show success message 
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const formatPrice = (price: number) => {
    return `฿${price.toLocaleString("th-TH")}`;
  };

  if (!product.variants) {
    return <div className="p-10 text-center">Product data issue</div>;
  }

  const { colors, sizes } = product.variants;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-600">
        <span>Women's Clothes</span> / <span>{product.category}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left - Image Slideshow */}
        <div className="w-full lg:w-3/5 relative">
          <div className="relative aspect-[3/4] bg-gray-100">
            <img 
              src={allImages[currentImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            
            {/* Only show navigation arrows if there are multiple images */}
            {allImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                
                <button 
                  onClick={nextImage} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </>
            )}
            
            {/* Favorite Button */}
            <button
              className="absolute right-4 top-4 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100"
              aria-label="Add to favorites"
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
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
          
          {/* Thumbnail row for additional images */}
          {allImages.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  className={`h-24 w-20 flex-shrink-0 border-2 transition-all ${
                    index === currentImageIndex ? "border-black" : "border-transparent"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
          
          {/* Image Pagination Dots - only show if multiple images */}
          {allImages.length > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex ? "w-8 bg-black" : "w-2 bg-gray-300"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right - Product Details */}
        <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
          <h1 className="text-3xl font-light mb-2">
            {product.name}
          </h1>
          <div className="text-xl mb-6">
            {formatPrice(product.price)}
          </div>

          {/* Trending Colors - only show if there are at least 2 colors */}
          {hasTrendingColors && (
            <div className="mb-8">
              <h2 className="font-medium mb-3">Trending Colours</h2>
              <div className="flex flex-wrap gap-2">
                {colors && colors.slice(0, 2).map((color) => (
                  <div 
                    key={color.name}
                    className="w-12 h-12 rounded-full border overflow-hidden"
                    style={{ backgroundColor: color.code }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Color Options - only show if there are multiple colors */}
          {colors && colors.length > 1 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-medium">Colour</h2>
                {selectedColor && <span>{selectedColor.name}</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-12 h-12 rounded-full border-2 overflow-hidden hover:opacity-80 transition ${
                      selectedColor?.name === color.name ? "border-black" : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color.name}`}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium">Select Size</h2>
              <button className="text-sm underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes && sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border text-sm min-w-[3rem] transition ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  }`}
                  onClick={() => {
                    setSelectedSize(size);
                    setIsSizeError(false);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
            {isSizeError && (
              <p className="text-red-500 text-sm mt-2">Please select a size</p>
            )}
          </div>

          {/* "Size sold out" functionality */}
          <div className="mb-8">
            <button className="text-sm underline">
              Size sold out? Select size to get notified
            </button>
          </div>

          {/* Success Message */}
          {addedToCart && (
            <div className="bg-green-50 text-green-800 p-3 mb-4 flex justify-between items-center">
              <span>Added to cart!</span>
              <button 
                onClick={handleGoToCart}
                className="underline"
              >
                View Cart
              </button>
            </div>
          )}

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToBag}
            className="w-full bg-black text-white py-3 mb-4 uppercase tracking-wider text-sm font-medium hover:bg-gray-800 transition"
          >
            Add to Bag — {formatPrice(product.price)}
          </button>

          {/* Product Details (Accordion) */}
          <div className="border-t border-gray-200 pt-4">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer py-2">
                <span className="font-medium">Product Details</span>
                <span className="transition group-open:rotate-180">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </summary>
              <div className="text-sm text-gray-600 pb-4">
                <p>This {product.subcategory || product.category.toLowerCase()} features premium quality and comfort.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Premium materials</li>
                  <li>Designed for everyday comfort</li>
                  <li>Versatile styling options</li>
                  <li>Machine washable</li>
                </ul>
              </div>
            </details>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer py-2">
                <span className="font-medium">Shipping & Returns</span>
                <span className="transition group-open:rotate-180">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </summary>
              <div className="text-sm text-gray-600 pb-4">
                <p>Free standard shipping on orders over $100.</p>
                <p className="mt-2">Return within 30 days for a full refund.</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;