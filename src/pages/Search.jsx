import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const mockProducts = [
  { id: 1, name: "Cement (50kg)", price: 350, category: "Building Materials" },
  { id: 2, name: "TMT Bar 12mm", price: 720, category: "Steel" },
  { id: 3, name: "Bricks (Per 1000)", price: 6000, category: "Building Materials" },
  { id: 4, name: "River Sand (1 Ton)", price: 1200, category: "Sand" },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(mockProducts);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setFiltered(
      mockProducts.filter((product) =>
        product.name.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Search Products</h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search for cement, TMT bars, bricks..."
          value={query}
          onChange={handleSearch}
          className="w-full border p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute right-4 top-3 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg hover:shadow-md transition-shadow"
            >
              <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-500">Category: {item.category}</p>
              <p className="text-blue-600 font-bold mt-2">₹{item.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-2">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
