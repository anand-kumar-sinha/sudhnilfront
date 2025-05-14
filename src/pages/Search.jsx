import React, { useContext, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchProductCard from "../components/SearchProductCard";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Search = () => {
  const { setLoading, setProducts, backandUrl, products } =
    useContext(ShopContext);
  const debounceRef = useRef(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const key = e.target.value;

    // Clear the previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set a new timeout
    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        if (key === "") return;
        const response = await axios.get(
          backandUrl + `/api/product/search/?key=${key}`
        );
        if (response.data.success) {
          console.log(response.data.products);
          setProducts(response.data.products);
        }
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    }, 3000); // 3 seconds
  };
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🔍 Search Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Sort by Price</h3>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="default">Default</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </div>

      {/* Search + Results */}
      <div className="md:col-span-3">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for cement, TMT bars, bricks..."
            value={query}
            onChange={handleSearch}
            className="w-full border p-4 pl-12 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products && products.length > 0 ? (
            products.map((item) => (
              <SearchProductCard item={item} key={item._id} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
