import { Star } from "lucide-react";
import React, { useState } from "react";

const ReviewCard = ({ review }) => {
  const { user, location, rating, title, variant, comment, verified, time } =
    review;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-md p-4 bg-white shadow-sm text-sm text-gray-800">
      <div className="flex items-center gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? "#22c55e" : "none"}
            stroke="#22c55e"
          />
        ))}
        <span className="font-medium text-green-600 text-sm ml-1">
          {rating.toFixed(1)}
        </span>
        <span className="mx-1">•</span>
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-gray-500 text-xs mb-2">Review for: {variant}</p>
      <p className="text-gray-700 mb-2">
        {expanded
          ? comment
          : comment.slice(0, 130) + (comment.length > 130 ? "..." : "")}
        {comment.length > 130 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:underline ml-1 text-sm"
          >
            {expanded ? "less" : "more"}
          </button>
        )}
      </p>
      <p className="text-gray-500 text-xs font-medium mb-3">
        {user}, {location}
      </p>
      <div className="flex items-center gap-2 text-gray-400 text-xs">
        {verified && <span className="font-semibold">✔ Verified Purchase</span>}
        <span>•</span>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
