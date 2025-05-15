import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const dummyReviews = [
  {
    user: "Manoj Tupe",
    location: "Pune",
    rating: 4,
    title: "Good choice",
    variant: "Color Classic Black",
    comment:
      "After 1 hr use the battery status was reduced too much. Also when we connect on Phone call and switch to Video call then airdop will disconnect automatically, we need to reconnect manually.",
    verified: true,
    time: "11 months ago",
  },
  {
    user: "Aarti Singh",
    location: "Delhi",
    rating: 5,
    title: "Excellent!",
    variant: "Color Blue",
    comment:
      "Great product with fantastic battery life. The sound quality is also top-notch. Worth the price!",
    verified: true,
    time: "2 months ago",
  },
];

const ReviewCard = ({ review }) => {
  const {
    user,
    location,
    rating,
    title,
    variant,
    comment,
    verified,
    time,
  } = review;

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-md p-4 bg-white shadow-sm text-sm text-gray-800">
      {/* Rating and Title */}
      <div className="flex items-center gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? "#22c55e" : "none"}
            stroke="#22c55e"
          />
        ))}
        <span className="font-medium text-green-600 text-sm ml-1">{rating.toFixed(1)}</span>
        <span className="mx-1">•</span>
        <span className="font-medium">{title}</span>
      </div>

      {/* Variant */}
      <p className="text-gray-500 text-xs mb-2">Review for: {variant}</p>

      {/* Comment with "more"/"less" toggle */}
      <p className="text-gray-700 mb-2">
        {expanded ? comment : comment.slice(0, 130) + (comment.length > 130 ? "..." : "")}
        {comment.length > 130 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:underline ml-1 text-sm"
          >
            {expanded ? "less" : "more"}
          </button>
        )}
      </p>

      {/* User Info */}
      <p className="text-gray-500 text-xs font-medium mb-3">
        {user}, {location}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-2 text-gray-400 text-xs">
        {verified && <span className="font-semibold">✔ Verified Purchase</span>}
        <span>•</span>
        <span>{time}</span>
      </div>
    </div>
  );
};

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/products/${productId}/reviews`);
      const fetchedReviews = res.data.reviews || [];
      setReviews(fetchedReviews.length > 0 ? fetchedReviews : dummyReviews);
    } catch (err) {
      setError("Failed to load reviews. Showing sample reviews.");
      setReviews(dummyReviews);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

  return (
    <div className="flex flex-col gap-4 text-sm text-gray-700">
      <h3 className="text-lg font-semibold">
        Customer Reviews ({reviews.length})
      </h3>

      <div className="flex items-center gap-1 text-yellow-500">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={20}
            fill={i < Math.round(averageRating) ? "#facc15" : "none"}
            stroke="#facc15"
          />
        ))}
        <span className="text-xs text-gray-500">
          ({averageRating.toFixed(1)} avg)
        </span>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      {reviews.map((rev, i) => (
        <ReviewCard key={i} review={rev} />
      ))}
    </div>
  );
};

export default Review;
