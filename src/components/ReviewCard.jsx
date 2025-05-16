import { Star } from "lucide-react";
import React, { useState } from "react";

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-md p-4 bg-white shadow-sm text-sm text-gray-800">
        {
            console.log(review)
        }
        
      <div className="flex items-center gap-1 mb-1">
        {Array.from({length: review?.rating }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < review?.rating ? "#22c55e" : "none"}
            stroke="#22c55e"
          />
        ))}
        <span className="font-medium text-green-600 text-sm ml-1">
          {/* {rating.toFixed(1)} */}
        </span>
        <span className="mx-1">•</span>
        <span className="font-medium">{review?.title}</span>
      </div>
      <p className="text-gray-500 text-xs mb-2">Review for: {review?.productName}</p>
      <p className="text-gray-700 mb-2">
        {expanded
          ? review?.description
          : review?.description.slice(0, 130) + (review?.description.length > 130 ? "..." : "")}
        {review?.description.length > 130 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:underline ml-1 text-sm"
          >
            {expanded ? "less" : "more"}
          </button>
        )}
      </p>
      <p className="text-gray-500 text-xs font-medium mb-3">
        {review?.userName}, {review?.city}
      </p>
      <div className="flex items-center gap-2 text-gray-400 text-xs">
        {/* {user?.verified && <span className="font-semibold">✔ Verified Purchase</span>} */}
        <span>•</span>
        {/* <span>{time}</span> */}
      </div>
    </div>
  );
};

export default ReviewCard;
