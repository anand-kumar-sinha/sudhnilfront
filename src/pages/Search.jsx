import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Simulated product data for demo
  const products = [
    { id: 1, name: "iPhone 14", category: "Mobile" },
    { id: 2, name: "Nike Shoes", category: "Footwear" },
    { id: 3, name: "Samsung TV", category: "Electronics" },
    { id: 4, name: "Sony Headphones", category: "Accessories" },
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="p-4 mt-4">
      <h2 className="text-xl font-semibold mb-2">Search Products</h2>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for products..."
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />
      <div>
        {results.length > 0 ? (
          <ul className="space-y-2">
            {results.map((product) => (
              <li key={product.id} className="p-3 border rounded-md">
                {product.name} - <span className="text-gray-500">{product.category}</span>
              </li>
            ))}
          </ul>
        ) : (
          query && <p className="text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  

  )
}

export default Search