import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const ProductsItem = ({ id, image, name, price, sizes = [] }) => {
  const { currency, addToCart } = useContext(ShopContext);
  
  // Handle image - it could be an array or a single value
  const imageSrc = Array.isArray(image) ? image[0] : image;

  // Generate a random rating between 4.0 and 5.0
  const rating = (4 + Math.random()).toFixed(1);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation to product page
    const defaultSize = (sizes && sizes.length > 0) ? sizes[0] : "1kg";
    addToCart(id, defaultSize); // Default to first available size
  };

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer block relative group">
      <div className="overflow-hidden aspect-square w-full bg-gray-50 relative">
        <img
          src={imageSrc || 'placeholder-image-url'}
          alt={name || 'Product'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform ease-in-out"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 bg-black text-white px-3 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
      <div className="pt-3">
        <p className="text-sm min-h-[36px] mb-1">{name}</p>
        <div className="flex items-center gap-1 mb-1">
          {[1,2,3,4,5].map((star) => (
            <img
              key={star}
              src={star <= Math.floor(rating) ? assets.star_icon : assets.star_dull_icon}
              alt="rating"
              className="w-3 h-3"
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">{rating}</span>
        </div>
        <p className="text-sm font-medium">
          {currency}
          {Number(price).toLocaleString('en-IN')}
        </p>
      </div>
    </Link>
  );
};

export default ProductsItem;
