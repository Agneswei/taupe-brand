import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

type ProductColor = {
  name: string;
  code: string;
  image: string;
  additionalImages?: string[];
  soldOut?: boolean;
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
  additionalImages?: string[];
};

const getProductWithVariants = (product: any): ExtendedProduct => {
  if (product.variants) {
    return product as ExtendedProduct;
  }

  let defaultVariant: ProductVariant = {
    colors: [
      { name: "Default", code: "#888888", image: product.image }
    ],
    sizes: ["S", "M", "L"]
  };

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

  return {
    ...product,
    variants: defaultVariant
  };
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  
  const [product, setProduct] = useState<ExtendedProduct | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isSizeError, setIsSizeError] = useState(false);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [hasTrendingColors, setHasTrendingColors] = useState(false);
  const [quantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Helper function to ensure proper image paths
  const formatImagePath = (imagePath: string): string => {
    if (!imagePath) return '';
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  useEffect(() => {
    const productId = Number(id);
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      const productWithVariants = getProductWithVariants(foundProduct);
      setProduct(productWithVariants);
      
      if (productWithVariants.variants) {
        if (productWithVariants.variants.colors && productWithVariants.variants.colors.length > 0) {
          // Find the first available (not sold out) color
          const firstAvailableColor = productWithVariants.variants.colors.find(color => !color.soldOut) 
            || productWithVariants.variants.colors[0]; // Fallback to first color if all are sold out
          
          setSelectedColor(firstAvailableColor);
          
          const colorImages = [formatImagePath(firstAvailableColor.image)];
          
          if (firstAvailableColor.additionalImages) {
            colorImages.push(...firstAvailableColor.additionalImages.map(formatImagePath));
          }
          
          if (productWithVariants.additionalImages) {
            colorImages.push(...productWithVariants.additionalImages.map(formatImagePath));
          }
          
          setAllImages(colorImages);
        } else {
          const productImages = [formatImagePath(productWithVariants.image)];
          if (productWithVariants.additionalImages) {
            productImages.push(...productWithVariants.additionalImages.map(formatImagePath));
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
      const colorImages = [formatImagePath(selectedColor.image)];
      
      if (selectedColor.additionalImages) {
        colorImages.push(...selectedColor.additionalImages.map(formatImagePath));
      }
      
      if (product.additionalImages) {
        colorImages.push(...product.additionalImages.map(formatImagePath));
      }
      
      setAllImages(colorImages);
      setCurrentImageIndex(0);
    }
  }, [selectedColor, product]);

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
    
    addToCart(
      product, 
      selectedSize, 
      quantity, 
      selectedColor ? selectedColor.name : undefined
    );
    
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const handleNotifyWhenAvailable = () => {
    setShowEmailInput(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Here you would typically send the email to your backend
      console.log(`Notify ${email} when ${selectedColor?.name} ${product.name} is available`);
      setEmailSubmitted(true);
      setTimeout(() => {
        setEmailSubmitted(false);
        setShowEmailInput(false);
        setEmail("");
      }, 3000);
    }
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
    // Reset email notification state when changing colors
    setShowEmailInput(false);
    setEmailSubmitted(false);
    setEmail("");
  };

  if (!product.variants) {
    return <div className="p-10 text-center">Product data issue</div>;
  }

  const { colors, sizes } = product.variants;

  // Check if selected color is sold out
  const isSelectedColorSoldOut = selectedColor?.soldOut || false;

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
            {allImages[currentImageIndex] ? (
              <img 
                src={allImages[currentImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', allImages[currentImageIndex]);
                  e.currentTarget.src = '/placeholder-image.jpg';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No image available
              </div>
            )}
            
            {/* Navigation arrows */}
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
          
          {/* Thumbnail row */}
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
                    onError={(e) => {
                      console.error('Thumbnail failed to load:', img);
                    }}
                  />
                </button>
              ))}
            </div>
          )}
          
          {/* Pagination dots */}
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

          {/* Trending Colors */}
          {hasTrendingColors && (
            <div className="mb-8">
              <h2 className="font-medium mb-3">Trending Colours</h2>
              <div className="flex flex-wrap gap-2">
                {colors && colors.slice(0, 2).filter(color => !color.soldOut).map((color) => (
                  <div 
                    key={color.name}
                    className="w-12 h-12 rounded-full border overflow-hidden"
                    style={{ backgroundColor: color.code }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Color Options */}
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
                    className={`w-12 h-12 rounded-full border-2 overflow-hidden hover:opacity-80 transition relative ${
                      selectedColor?.name === color.name ? "border-black" : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => handleColorSelect(color)}
                    aria-label={`Select color ${color.name}${color.soldOut ? ' (Sold Out)' : ''}`}
                  >
                    {/* Simple diagonal slash for sold out */}
                    {color.soldOut && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-black rotate-45"></div>
                      </div>
                    )}
                  </button>
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

          {/* Email Submitted Message */}
          {emailSubmitted && (
            <div className="bg-green-50 text-green-800 p-3 mb-4">
              <span>We'll notify you when this item is back in stock!</span>
            </div>
          )}

          {/* Add to Bag or Notify Button */}
          {isSelectedColorSoldOut ? (
            <div>
              {!showEmailInput ? (
                <button
                  onClick={handleNotifyWhenAvailable}
                  className="w-full bg-black text-white py-3 mb-4 uppercase tracking-wider text-sm font-medium hover:bg-gray-800 transition"
                >
                  Notify When Available
                </button>
              ) : (
                <form onSubmit={handleEmailSubmit} className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-3 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black"
                      required
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition"
                    >
                      Notify Me
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEmailInput(false)}
                    className="text-sm text-gray-500 mt-2 hover:underline"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          ) : (
            <button
              onClick={handleAddToBag}
              className="w-full bg-black text-white py-3 mb-4 uppercase tracking-wider text-sm font-medium hover:bg-gray-800 transition"
            >
              Add to Bag — {formatPrice(product.price)}
            </button>
          )}

          {/* Product Details Accordion */}
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