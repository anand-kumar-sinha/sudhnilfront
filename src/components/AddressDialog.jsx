import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

const AddressDialog = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  const inputClass =
    "w-full border border-gray-300 rounded-md p-2 transition duration-200 transform focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:-translate-y-0.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md animate-fadeIn scale-95">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Address</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-3">
          <input type="text" placeholder="Full Name" className={inputClass} />
          <input type="text" placeholder="Mobile Number" className={inputClass} />
          <textarea
            placeholder="Address"
            rows="3"
            className={`${inputClass} resize-none`}
          />
          <input type="text" placeholder="City" className={inputClass} />
          <input type="text" placeholder="State" className={inputClass} />
          <input type="text" placeholder="Pincode" className={inputClass} />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-blue-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressDialog;
