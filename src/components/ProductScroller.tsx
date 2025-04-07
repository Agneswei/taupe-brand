import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";

type Props = {
  title: string;
  products: Product[];
};

const ProductScroller: React.FC<Props> = ({ title, products }) => {
  return (
    <div className="px-6 py-10">
      <h2 className="text-xl font-light mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-6 pb-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="min-w-[180px] max-w-[180px] shrink-0"
          >
            <div className="aspect-[2/3] bg-gray-100 overflow-hidden rounded">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <p className="truncate">{product.name}</p>
              <p className="text-gray-500">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductScroller;
