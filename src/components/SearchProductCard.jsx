import React from 'react'

const SearchProductCard = ({item}) => {
  return (
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
  )
}

export default SearchProductCard
