import React from "react";
import { Product } from "../data/products";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="text-sm">
    <img src={product.image} alt={product.name} className="w-full aspect-[2/3] object-cover mb-2" />
    <h3>{product.name}</h3>
    <p className="text-gray-600">${product.price}</p>
  </div>
);

export default ProductCard;
