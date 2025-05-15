import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ data }) => {
  const naivgate = useNavigate()
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition" onClick={() => naivgate(`/collection`, { state: { id: data._id} })}>
      <img
        src={data?.image}
        alt="Electronics"
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{data?.categoryName}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
