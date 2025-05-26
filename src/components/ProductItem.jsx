import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ item }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link
      className="text-gray-700 cursor-pointer "
      to={`/product/${item?._id}`}
    >
      <div className="w-full aspect-[4/3] mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center transition-all transform hover:scale-105 ">
        <img
          className="w-full h-full object-fill transition-transform duration-300 ease-in-out transform hover:scale-110 "
          src={item?.image[0]}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{item?.name}</p>
      <p className="text-sm font-medium">
        {currency}
        {item?.price}
      </p>
    </Link>
  );
};

export default ProductItem;
