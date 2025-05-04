import React, { useContext } from "react";
import CategoryCard from "./CategoryCard";
import { ShopContext } from "../context/ShopContext";

const Category = () => {
  const { categories } = useContext(ShopContext);
  return (
    <div>
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Shop by Categoryxxdsffdsfdsfdsfsdfdsf
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {/* Category Card */}
            {
              console.log(categories)
            }

            {categories &&
              categories
                ?.slice(0, 4)
                .map((category) => (
                  <CategoryCard key={category._id} category={category} />
                ))}

            <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
              <img
                src="sdlfjld"
                alt="Electronics"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  sdfdfsdfdf
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
