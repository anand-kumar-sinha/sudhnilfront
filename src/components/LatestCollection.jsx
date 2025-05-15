import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  // new state variable storing initial 10 products
  const [latestProducts, setLatestProducts] = useState([]);
  // products will get loaded in latesProducts state
  //using useEffectHook
  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]); //<---dependency array
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, rem
          beatae est animi minus aspernatur voluptatum fuga provident temporibus
          voluptate, saepe laboriosam exercitationem ad harum ab, numquam fugit
          nobis explicabo!
        </p>
      </div>

      {/* rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        { latestProducts && latestProducts?.map((item, index) => (
          <ProductItem
        key={index}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
