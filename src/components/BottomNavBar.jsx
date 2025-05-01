import React from 'react'

const BottomNavBar = () => {
  return (
<div className="fixed bottom-[60px] left-1/2 transform -translate-x-1/2 w-full max-w-[800px] px-4">
      <div className="flex justify-between bg-white shadow-lg rounded-full p-3 border border-gray-200">
        <button className="flex flex-col items-center text-sm text-gray-700">
          <span>🏠</span>
          <span>Home</span>
        </button>
        <button className="flex flex-col items-center text-sm text-gray-700">
          <span>🔍</span>
          <span>Search</span>
        </button>
        <button className="flex flex-col items-center text-sm text-gray-700">
          <span>➕</span>
          <span>Add</span>
        </button>
        <button className="flex flex-col items-center text-sm text-gray-700">
          <span>❤️</span>
          <span>Likes</span>
        </button>
        <button className="flex flex-col items-center text-sm text-gray-700">
          <span>👤</span>
          <span>Profile</span>
        </button>
      </div>
    </div>
  )
}

export default BottomNavBar
