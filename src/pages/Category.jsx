import React, { useContext, useEffect, useState } from "react";
import { Filter } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const CategoryPage = () => {
  const { backandUrl, setLoading } = useContext(ShopContext);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backandUrl + "/api/category/fetch/all");
      if (response.data.success) {
        setCategories(response.data.category);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching categories:", error);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Categories</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.length > 0 ? (
          categories.map((category, index) => {
            try {
              return <CategoryCard data={category} key={index} />;
            } catch (e) {
              console.error("Error rendering CategoryCard:", e);
              return <div key={index}>Error rendering category</div>;
            }
          })
        ) : (
          <p className="text-gray-500">No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
