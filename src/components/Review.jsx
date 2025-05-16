import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import ReviewCard from "./ReviewCard";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const { setLoading, backandUrl } = useContext(ShopContext);

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
      setLoading(true);
      const res = await axios.get(
        backandUrl + `/api/review/fetch/${productId}`
      );

      if (res.data.success) {
        const fetchedReviews = res.data.reviews || [];
        setReviews(fetchedReviews.length > 0 ? fetchedReviews : dummyReviews);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to load reviews. Showing sample reviews.");
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
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      console.log(formData);
      const response = await axios.post(
        backandUrl + `/api/review/add/${productId}`,
        formData,
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        console.log("Review submitted successfully");
        fetchReviews();
        setFormData({
          user: "",
          location: "",
          rating: 0,
          title: "",
          variant: "",
          comment: "",
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message || err.message);
      console.error(err);
    }
  };

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

  return (
    <div className="flex flex-col gap-4 text-sm text-gray-700">
      
      <h3 className="text-lg font-semibold">
        Customer Reviews ({reviews.length})
      </h3>

      <div className="flex items-center gap-1 ">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={20}
            fill={i < Math.round(averageRating) ? "#22c55e" : "none"}
            stroke="#22c55e"
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
      <form
        onSubmit={handleSubmit}
        className="space-y-3 border p-4 rounded-md bg-gray-50 mt-4"
      >
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
              fill={i < formData.rating ? "#22c55e" : "none"}
              stroke="#22c55e"
              className="cursor-pointer"
              onClick={() => handleRatingChange(i)}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">
            {formData.rating}/5
          </span>
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
