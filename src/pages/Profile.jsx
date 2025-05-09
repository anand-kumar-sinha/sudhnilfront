import React, { useContext, useState } from "react"; // ✅ added useState
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiSettings,
  FiMessageCircle,
  FiBell,
  FiPackage,
  FiEdit2,
  FiPlus,
  FiShoppingCart,
  FiMapPin,
} from "react-icons/fi";

import AddressDialog from "../components/AddressDialog"; // ✅ make sure path is correct

const Profile = () => {
  const { token, setToken, setCartItems, user } = useContext(ShopContext);
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false); // ✅ dialog state

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-200 space-y-10">
        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=User"
              alt="avatar"
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Hello, {user?.name}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={logOut}
            className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-lg 
              hover:bg-red-600 active:bg-red-700 focus:ring-2 focus:ring-red-300 
              transition duration-200 ease-in-out"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-sm">
          {[
            {
              icon: <FiPackage className="text-xl text-blue-600" />,
              label: "My Orders",
              onClick: () => navigate("/orders"),
            },
            {
              icon: <FiShoppingCart className="text-xl text-blue-600" />,
              label: "My Cart",
              onClick: () => navigate("/cart"),
            },
            {
              icon: <FiMapPin className="text-xl text-blue-600" />,
              label: "Address",
              onClick: () => navigate("/address"),
            },
            {
              icon: <FiSettings className="text-xl text-blue-600" />,
              label: "Settings",
              onClick: () => navigate("/settings"),
            },
            {
              icon: <FiMessageCircle className="text-xl text-blue-600" />,
              label: "Support",
              onClick: () => navigate("/support"),
            },
            {
              icon: <FiBell className="text-xl text-blue-600" />,
              label: "Notifications",
              onClick: () => navigate("/notifications"),
            },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="p-5 bg-gray-50 border rounded-xl 
                hover:bg-blue-50 hover:shadow-lg active:bg-blue-100 
                focus:ring-2 focus:ring-blue-300 
                flex flex-col items-center gap-2 
                transition duration-200 ease-in-out"
            >
              {item.icon}
              <span className="font-medium text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Saved Addresses */}
        {user?.defaultAddress && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Default Address
            </h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-xl bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-700">
                      {user?.defaultAddress?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {user?.defaultAddress?.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone: +91 {user?.defaultAddress?.mobileNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      Pin Code: {user?.defaultAddress?.pinCode}
                    </p>
                    <p className="text-sm text-gray-600">
                      State: {user?.defaultAddress?.state}
                    </p>
                    <p className="text-sm text-gray-600">
                      City: {user?.defaultAddress?.city}
                    </p>
                  </div>
                  <button className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                    <FiEdit2 className="text-base" /> Edit
                  </button>
                </div>
              </div>

              {/* ✅ Open dialog on click */}
              <button
                onClick={() => setIsDialogOpen(true)}
                className="w-full flex items-center justify-center gap-2 text-blue-600 hover:underline text-sm mt-2"
              >
                <FiPlus /> Add New Address
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Render the dialog */}
      <AddressDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Profile;
