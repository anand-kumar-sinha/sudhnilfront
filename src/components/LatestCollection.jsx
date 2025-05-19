import React, { useContext, useState, useEffect, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { productsBestSeller } = useContext(ShopContext);
  const [visibleCount, setVisibleCount] = useState(10);
  const [latestproductsBestSeller, setLatestproductsBestSeller] = useState([]);
  const loaderRef = useRef(null);

  // Update product list based on visibleCount
  useEffect(() => {
    setLatestproductsBestSeller(productsBestSeller.slice(0, visibleCount));
  }, [productsBestSeller, visibleCount]);

  // Infinite scroll trigger using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < productsBestSeller.length) {
          setVisibleCount((prev) => prev + 10);
        }
      },
      { threshold: 1.0 }
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [visibleCount, productsBestSeller.length]);

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

      {/* rendering productsBestSeller */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestproductsBestSeller.map((item, index) => (
          <ProductItem key={index} item={item} />
        ))}
      </div>

      {/* Loader to trigger more loading */}
      {visibleCount < productsBestSeller.length && (
        <div ref={loaderRef} className="text-center py-6 text-gray-500">
          Loading more productsBestSeller...
        </div>
      )}
    </div>
  );
};

export default LatestCollection;
