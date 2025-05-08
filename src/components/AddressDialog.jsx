import React, { useContext, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddressDialog = ({ isOpen, onClose }) => {
  const { user, backandUrl, setLoading } = useContext(ShopContext);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phome, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");

  const newAddressHanlder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (
        !name ||
        !email ||
        !phome ||
        !address ||
        !state ||
        !city ||
        !pinCode
      ) {
        alert("Please fill all the fields");
        return;
      }
      const response = await axios.post(
        backandUrl + "/api/address/add",
        { name, email, mobileNumber: phome, address, state, city, pinCode },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
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
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Address
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-3" onSubmit={newAddressHanlder}>
          <input
            type="text"
            placeholder="Full Name"
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className={inputClass}
            value={phome}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            placeholder="Address"
            rows="3"
            className={`${inputClass} resize-none`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            className={inputClass}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            className={inputClass}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="Pincode"
            className={inputClass}
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-400 text-white hover:bg-blue-600 transition-colors duration-200"
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
