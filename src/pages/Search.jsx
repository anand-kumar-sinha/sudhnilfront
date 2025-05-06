import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const mockProducts = [
  { id: 1, name: "Cement (50kg)", price: 350, category: "Building Materials" },
  { id: 2, name: "TMT Bar 12mm", price: 720, category: "Steel" },
  { id: 3, name: "Bricks (Per 1000)", price: 6000, category: "Building Materials" },
  { id: 4, name: "River Sand (1 Ton)", price: 1200, category: "Sand" },
];

const categories = ["All", "Building Materials", "Steel", "Sand"];

const Search = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const handleSearch = (e) => setQuery(e.target.value.toLowerCase());
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  const filtered = mockProducts
    .filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesQuery && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🔍 Search Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="space-y-6 md:col-span-1">
          <div>
            <h3 className="font-semibold text-lg mb-2">Category</h3>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

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
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="border p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-blue-600 text-lg font-bold mt-1">
                    ₹{item.price}
                  </p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
