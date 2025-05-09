import React, { useContext, useEffect, useState } from "react";
import { Plus, MapPin, Trash2, Pencil } from "lucide-react";
import AddressDialog from "../components/AddressDialog"; // Make sure path is correct
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddressPage() {
  const { backandUrl, setLoading } = useContext(ShopContext);
  const [addresses, setAddresses] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backandUrl + "/api/address/fetch", {
        headers: { token: localStorage.getItem("token") },
      });
      if (response.data.success) {
        setAddresses(response.data.address);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const setDefaultAddress = async (addressId) => {
    try {
      setLoading(true);
      const response = await axios.post(
        backandUrl + `/api/address/default`,
        { addressId },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAddresses();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      if (!addressId) {
        toast.error("No address found");
      }
      setLoading(true);
      const response = await axios.post(
        backandUrl + `/api/address/delete`,
        {
          addressId,
        },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAddresses();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="text-gray-700" /> Saved Addresses
        </h1>
        <button
          onClick={() => setIsDialogOpen(true)} // ✅ Open dialog on click
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          <Plus size={16} /> Add Address
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {addresses &&
          addresses?.map((addr) => (
            <div
              key={addr._id}
              className={`p-4 border rounded-xl shadow-sm ${
                addr?.default ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setDefaultAddress(addr._id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {addr.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">{addr.address}</p>
                  <p className="text-sm text-gray-600">
                    Phone: {addr.mobileNumber}
                  </p>
                  {addr?.default && (
                    <span className="inline-block mt-2 text-xs text-blue-600 font-medium">
                      Default Address
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-gray-500 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      // your edit logic here
                    }}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAddress(addr._id);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* ✅ Add the dialog here */}
      <AddressDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
