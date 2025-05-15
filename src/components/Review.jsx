import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ user: "", rating: 0, comment: "" });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/products/${productId}/reviews`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      setError("Failed to load reviews.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user || !formData.rating || !formData.comment) {
      setError("Please fill all fields and select a rating.");
      return;
    }

    try {
      setLoading(true);
      if (editIndex !== null) {
        const reviewToEdit = reviews[editIndex];
        await axios.put(`/api/products/${productId}/reviews/${reviewToEdit._id}`, formData);
      } else {
        await axios.post(`/api/products/${productId}/reviews`, formData);
      }
      setFormData({ user: "", rating: 0, comment: "" });
      setEditIndex(null);
      fetchReviews();
      setError("");
    } catch (err) {
      setError("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    const rev = reviews[index];
    setFormData({ user: rev.user, rating: rev.rating, comment: rev.comment });
    setEditIndex(index);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${productId}/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      setError("Failed to delete review.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

  return (
    <div className="flex flex-col gap-4 text-sm text-gray-700">
      <h3 className="text-lg font-semibold">Customer Reviews ({reviews.length})</h3>

      <div className="flex items-center gap-1 text-yellow-500">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={20}
            fill={i < Math.round(averageRating) ? "#facc15" : "none"}
            stroke="#facc15"
          />
        ))}
        <span className="text-xs text-gray-500">({averageRating.toFixed(1)} avg)</span>
      </div>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((rev, i) => (
          <div key={i} className="border p-3 rounded-md bg-gray-50">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{rev.user}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    fill={rev.rating >= s ? "#facc15" : "none"}
                    stroke="#facc15"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm">{rev.comment}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(rev.date).toLocaleDateString()}
            </p>
            <div className="flex gap-2 mt-2 text-xs">
              <button
                onClick={() => handleEdit(i)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(rev._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.user}
          onChange={(e) => setFormData({ ...formData, user: e.target.value })}
          className="border px-4 py-2 rounded-md"
        />

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              onClick={() => setFormData({ ...formData, rating: star })}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              fill={formData.rating >= star || hoveredRating >= star ? "#3b82f6" : "none"}
              stroke="#3b82f6"
              className="cursor-pointer transition-colors"
            />
          ))}
        </div>

        <textarea
          rows={4}
          placeholder="Your Review"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          className="border px-4 py-2 rounded-md"
        />

        <div className="flex justify-start">
          <button
            type="submit"
            disabled={loading}
            className="text-sm px-3 py-1.5 rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Submitting..." : editIndex !== null ? "Update Review" : "Submit Review"}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Review;
