import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const BottomNavBar = () => {
  const { setShowSearch } = useContext(ShopContext);

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white/80 backdrop-blur-md shadow-inner border-t border-gray-200 z-50">
      {/* BottomNavBar container for all screen sizes */}
      <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-700 md:hidden">
        {/* Mobile layout */}
        <Link to="/" className="flex flex-col items-center hover:text-blue-600">
          <span>🏠</span>
          <span>Home</span>
        </Link>
        <Link to="/collection" className="flex flex-col items-center hover:text-blue-600">
          <span>🛒</span>
          <span>Shop</span>
        </Link>
        <Link
          to="/cart"
          className="flex flex-col items-center justify-center hover:text-blue-600"
        >
          <span>➕</span>
          <span>Add</span>
        </Link>
        <button
          className="flex flex-col items-center hover:text-blue-600"
          onClick={() => setShowSearch(true)}
        >
          <span>🔍</span>
          <span>Search</span>
        </button>
        <Link to="/profile" className="flex flex-col items-center hover:text-blue-600">
          <span>👤</span>
          <span>Profile</span>
        </Link>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex justify-between items-center px-10 py-4 text-xs text-gray-700">
        <Link to="/" className="flex flex-col items-center hover:text-blue-600">
          <span>🏠</span>
          <span>Home</span>
        </Link>
        <Link to="/collection" className="flex flex-col items-center hover:text-blue-600">
          <span>🛒</span>
          <span>Shop</span>
        </Link>
        <Link
          to="/cart"
          className="flex flex-col items-center justify-center hover:text-blue-600"
        >
          <span>➕</span>
          <span>Add</span>
        </Link>
        <button
          className="flex flex-col items-center hover:text-blue-600"
          onClick={() => setShowSearch(true)}
        >
          <span>🔍</span>
          <span>Search</span>
        </button>
        <Link to="/profile" className="flex flex-col items-center hover:text-blue-600">
          <span>👤</span>
          <span>Profile</span>
        </Link>
      </div>
    </div>
  )
}

export default BottomNavBar




