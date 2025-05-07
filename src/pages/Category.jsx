import React, { useState } from "react";
import { ShoppingCart, Filter } from "lucide-react";

const categories = [
  { id: 1, name: "Electronics", image: "/images/electronics.jpg" },
  { id: 2, name: "Fashion", image: "/images/fashion.jpg" },
  { id: 3, name: "Home & Kitchen", image: "/images/home.jpg" },
  { id: 4, name: "Books", image: "/images/books.jpg" },
  { id: 5, name: "Sports", image: "/images/sports.jpg" },
];

export default function CategoryPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{category.name}</h2>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No categories found.</p>
        )}
      </div>
    </div>
  );
}