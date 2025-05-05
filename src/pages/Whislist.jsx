import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Whislist = () => {
  const { products, currency } = useContext(ShopContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      const ids = JSON.parse(saved);
      const items = products.filter((product) => ids.includes(product._id));
      setWishlistItems(items);
    }
  }, [products]);

  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter((item) => item._id !== id);
    setWishlistItems(updated);
    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated.map((item) => item._id))
    );
  };

  return (
    <div className="px-4 sm:px-10 py-10 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          My Wishlist <span className="text-blue-500">({wishlistItems.length})</span>
        </h2>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <img
            src="https://img.freepik.com/free-vector/wishlist-concept-illustration_114360-1435.jpg"
            alt="Empty Wishlist"
            className="w-64 h-64 mx-auto mb-6"
          />
          <p className="text-xl mb-4 font-medium">Your wishlist is empty</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            🛍️ Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
              <p className="text-blue-600 font-semibold mb-2">
                {currency}{item.price}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="text-red-500 hover:text-red-700 transition font-medium"
                >
                  ❌ Remove
                </button>
                <button
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Whislist;
