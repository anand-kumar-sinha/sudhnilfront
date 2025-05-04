import React from "react";

const CategoryCard = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
      <img
        src="/images/electronics.jpg"
        alt="Electronics"
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">Electronics</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
