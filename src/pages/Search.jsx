import React, { useContext, useRef, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import SearchProductCard from "../components/SearchProductCard";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Search = () => {
  const { setLoading, setProducts, backandUrl, products } = useContext(ShopContext);
  const debounceRef = useRef(null);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [sortedProducts, setSortedProducts] = useState([]);

  // Apply sorting whenever products or sortOrder changes
  useEffect(() => {
    if (!products) return;

    let sorted = [...products];
    switch (sortOrder) {
      case "low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default sorting (e.g., relevance or original order)
        break;
    }
    setSortedProducts(sorted);
  }, [products, sortOrder]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const key = e.target.value;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        if (key === "") {
          setProducts([]);
          return;
        }
        const response = await axios.get(
          `${backandUrl}/api/product/search/?key=${key}`
        );
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 500); // Reduced debounce time for better UX
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🔍 Search Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Sort by Price</h3>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="default">Default (Relevance)</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="md:col-span-3">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((item) => (
              <SearchProductCard item={item} key={item._id} />
            ))
          ) : query ? (
            <p className="text-center text-gray-500 col-span-full">
              No products found matching "{query}"
            </p>
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              Start typing to search for products
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;