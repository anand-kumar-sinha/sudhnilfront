import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CiHeart } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { BsBag } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const BottomNavBar = () => {
  const { setShowSearch } = useContext(ShopContext);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:bottom-2 md:flex md:justify-center">
      <div className="w-full bg-white/80 backdrop-blur-md shadow-inner border-t border-gray-200 md:max-w-[800px] md:rounded-xl md:border md:shadow-lg">
        {/* Mobile layout */}
        <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-700 md:hidden">
          <Link
            to="/"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <span>
              <GoHome size={25} />
            </span>
            <span>Home</span>
          </Link>
          <Link
            to="/whislist"
            className="flex flex-col items-center justify-center hover:text-blue-600"
          >
            <span>
              <CiHeart size={25} />
            </span>
            <span>Whislist</span>
          </Link>
          <button
            className="flex flex-col items-center hover:text-blue-600"
            onClick={() => setShowSearch(true)}
          >
            <span>
              <CiSearch size={25} />
            </span>
            <span>Search</span>
          </button>
          <Link
            to="/profile"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <span>
              <CgProfile size={25} />
            </span>
            <span>Profile</span>
          </Link>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex justify-between items-center px-10 py-4 text-xs text-gray-700">
          <Link
            to="/"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <span>
              <GoHome size={25} />
            </span>
            <span>Home</span>
          </Link>
          <Link
            to="/whislist"
            className="flex flex-col items-center justify-center hover:text-blue-600"
          >
            <span>
              {" "}
              <CiHeart size={25} />
            </span>
            <span>Whislist</span>
          </Link>
          <button
            className="flex flex-col items-center hover:text-blue-600"
            onClick={() => setShowSearch(true)}
          >
            <span>
              {" "}
              <CiSearch size={25} />
            </span>
            <span>Search</span>
          </button>
          <Link
            to="/profile"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <span>
              <CgProfile size={25} />
            </span>
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
