import React from "react";

const SearchProductCard = ({ item }) => {
  if (!item) return null;

  return (
    <div
      key={item._id}
      className="border p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col h-full"
    >
      {/* Product Image */}
      <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-gray-100">
        {item?.image && item.image.length > 0 ? (
          <img
            src={item.image[0]}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        {/* Product Name and Price */}
        <div className="mb-2">
          <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {item.name}
          </h2>
          <p className="text-blue-600 text-lg font-bold mt-1">₹{item.price}</p>
        </div>

        {/* Category Section */}
        <div className="flex gap-2 flex-wrap mb-2">
          {item?.category?.categoryName && (
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              Category: {item.category.categoryName}
            </span>
          )}
        </div>

        {/* Sizes */}
        {item.sizes?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.sizes.map((size) => (
              <span
                key={size}
                className="text-xs border px-2 py-0.5 rounded-full"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* View Details Button */}
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition">
        View Details
      </button>
    </div>
  );
};

export default SearchProductCard;
