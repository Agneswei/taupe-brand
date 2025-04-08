import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import { useCurrency } from "../context/CurrencyContext";

type Props = {
  title: string;
  products: Product[];
};



const ProductScroller: React.FC<Props> = ({ title, products }) => {
  const { formatPrice } = useCurrency();
  return (
    <div className="w-full px-4 md:px-0 py-10">
      <h2 className="text-xl font-light mb-6 px-2 md:px-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {/* choose first 4 products in my array product.ts*/}
        {products.slice(0,4).map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="w-full"
          >
            <div className="aspect-[3/4] w-full overflow-hidden">
            <div className="relative w-full h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300 absolute inset-0 z-10"
              />
              {product.variants?.colors?.[1]?.image && (
                <img
                  src={product.variants.colors[1].image}
                  alt={`${product.name} hover`}
                  className="w-full h-full object-cover transition-opacity duration-300 opacity-0 hover:opacity-100 absolute inset-0 z-20"
                />
              )}
            </div>
            </div>
            <div className="w-full bg-white px-4 py-3 text-sm">
            <p className="truncate text-black">{product.name}</p>
              <p className="text-gray-500">{formatPrice(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default ProductScroller;
