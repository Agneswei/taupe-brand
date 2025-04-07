import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative w-full overflow-hidden aspect-[2/3] bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-2 text-sm">
        <h3 className="font-light">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;

