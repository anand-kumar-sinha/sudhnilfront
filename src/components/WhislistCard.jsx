import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const WhislistCard = ({item}) => {
   const {currency} = useContext(ShopContext)
  return (
    <div
      key={item._id}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 border border-gray-200"
    >
      <img
        src={item.image[0]}
        alt={item.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
      <p className="text-blue-600 font-semibold mb-2">
        {item.price}
        {currency}
      </p>
      <div className="flex justify-between items-center">
        <button
          onClick={() => removeFromWishlist(item._id)}
          className="text-red-500 hover:text-red-700 transition font-medium"
        >
          ❌ Remove
        </button>
        <button
          onClick={() => navigate(`/product/${item._id}`)}
          className="text-sm text-blue-500 hover:underline"
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default WhislistCard;
