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
      "Good TMT bars, though a bit pricey but quality is worth it.",
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
      "Excellent quality TMT bars. Very strong and durable for construction",
    verified: true,
    time: "2 months ago",
  },
];

const ReviewCard = ({ review }) => {
  const { user, location, rating, title, variant, comment, verified, time } = review;
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
        <span className="font-medium text-green-600 text-sm ml-1">{rating.toFixed(1)}</span>
        <span className="mx-1">•</span>
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-gray-500 text-xs mb-2">Review for: {variant}</p>
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

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    user: "",
    location: "",
    rating: 0,
    title: "",
    variant: "",
    comment: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (index) => {
    setFormData((prev) => ({ ...prev, rating: index + 1 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      ...formData,
      verified: true,
      time: "Just now",
    };

    try {
      // Replace with actual POST request once backend is ready
      // await axios.post(`/api/products/${productId}/reviews`, newReview);
      setReviews((prev) => [newReview, ...prev]);
      setFormData({
        user: "",
        location: "",
        rating: 0,
        title: "",
        variant: "",
        comment: "",
      });
    } catch (err) {
      console.error("Failed to submit review");
    }
  };

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

      {/* Reviews List */}
      {reviews.map((rev, i) => (
        <ReviewCard key={i} review={rev} />
      ))}

      {/* Review Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-md bg-gray-50 mt-4">
        <h4 className="font-medium text-gray-800">Write a Review</h4>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="user"
            value={formData.user}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
            className="border p-2 rounded w-full"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Your city"
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Review Title"
          required
          className="border p-2 rounded w-full"
        />

        <input
          name="variant"
          value={formData.variant}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
          className="border p-2 rounded w-full"
        />

        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
          placeholder="Write your review..."
          required
          rows={3}
          className="border p-2 rounded w-full"
        />

        {/* Star Rating Selector */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={24}
              fill={i < formData.rating ? "#facc15" : "none"}
              stroke="#facc15"
              className="cursor-pointer"
              onClick={() => handleRatingChange(i)}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">{formData.rating}/5</span>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Review;
