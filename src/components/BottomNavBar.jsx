import React from "react";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { assets } from "../assets/assets";

const BottomNavBar = () => {
  return (
    <div className="fixed bottom-[60px] left-1/2 transform -translate-x-1/2 w-full max-w-[800px] px-4">
      <div className="flex justify-between bg-white shadow-lg rounded-full p-3 border border-gray-200">
        <button className="flex flex-col items-center text-sm text-gray-700">
          <span>
            <GoHome size={25}/>
          </span>
          <span>Home</span>
        </button>
        <button className="flex flex-col items-center text-sm text-gray-700">
          <span>
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
          </span>
          <span>Search</span>
        </button>

        <button className="flex flex-col items-center text-sm text-gray-700">
          <span>
            {" "}
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          </span>
          <span>Cart</span>
        </button>
        <button className="flex flex-col items-center text-sm text-gray-700">
          <span>
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
          </span>
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavBar;
