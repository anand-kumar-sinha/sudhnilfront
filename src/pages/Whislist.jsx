import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import WhislistCard from "../components/WhislistCard";
import axios from "axios";

const Whislist = () => {
  const { user, setLoading, backandUrl } = useContext(ShopContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    fetchWhislist(token);
  }, [page]);

  const fetchWhislist = async (token) => {
    try {
      setLoading(true);
      const headers = {
        "Content-Type": "application/json",
        Token: token,
      };

      const response = await axios.post(
        backandUrl + "/api/whislist/fetch",
        { user, page },
        { headers }
      );

      if (response?.data?.success) {
        setWishlistItems(response?.data?.wishlist);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-10 py-10 bg-gray-50 min-h-[70vh]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          My Wishlist{" "}
          <span className="text-blue-500">({wishlistItems.length})</span>
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
          {wishlistItems &&
            wishlistItems?.map((item) => (
              <WhislistCard key={item._id} item={item} fetchWhislist={fetchWhislist} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Whislist;
