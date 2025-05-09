import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

const EditAddressDialog = ({ isOpen, onClose, addressData, token, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const backandUrl = "https://ecomm-backend-tau.vercel.app";

  useEffect(() => {
    if (addressData) {
      setFormData(addressData);
    }
  }, [addressData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${backandUrl}/api/address/update/${addressData._id}`,
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Address updated successfully!");
        onSave(); // Optional: re-fetch or update parent state
        onClose();
      } else {
        toast.error("Failed to update address");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FiX size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["fullName", "mobileNumber", "address", "city", "state", "pincode"].map((field) => (
            <input
              key={field}
              type={field === "mobileNumber" || field === "pincode" ? "number" : "text"}
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 transition-all"
            />
          ))}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
 

  )
}

export default EditAddressDialog
