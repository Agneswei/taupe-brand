import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { Link  } from "react-router-dom";
import { Product } from "../data/products";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <div className="p-10 text-center">Product not found</div>;

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
<Link to={`/product/${product.id}`}>
    <div className="text-sm hover:opacity-90 transition">
    <img src={product.image} alt={product.name} className="w-full aspect-[2/3] object-cover mb-2" />
    <h3>{product.name}</h3>
    <p className="text-gray-600">${product.price}</p>
    </div>
</Link>
);

  return (
    <div className="flex flex-col md:flex-row gap-12 p-10">
      {/* Left - Image */}
      <div className="w-full md:w-1/2">
        <img src={product.image} alt={product.name} className="w-full" />
      </div>

      {/* Right - Details */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-xl text-gray-700">Taupe</h2>
        <h1 className="text-3xl font-light">{product.name}</h1>
        <p className="text-xl font-semibold">${product.price}</p>

        {/* Size Selector */}
        <label className="block text-sm mt-4">Size</label>
        <select className="border p-2 w-full max-w-xs">
          <option>Select a size</option>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>

        {/* Add to Cart Button */}
        <button className="bg-black text-white px-6 py-3 mt-4 uppercase text-sm tracking-wider hover:opacity-90 transition">
          Add to Bag — ${product.price}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
