import React, { useContext, useState, useEffect } from "react";
import {
  PackageOpen,
  Package,
  Truck,
  Navigation,
  CheckCircle,
  Tag,
  Bell,
  Trash2,
} from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

export default function NotificationPage() {
  const { setLoading, backandUrl } = useContext(ShopContext);
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backandUrl}/api/notifications/get`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="text-gray-700" /> Notifications
        </h1>
        {notifications.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="text-sm text-red-600 hover:text-red-800 border border-red-500 px-3 py-1 rounded-full"
          >
            Delete All
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          "all",
          "Order Placed",
          "Packing",
          "Shipping",
          "Out for delivery",
          "Delivered",
          "Offer",
        ].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              filter === type
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          You’re all caught up!
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notif) => (
            <div
              key={notif._id}
              className={`flex items-start gap-4 p-4 rounded-xl shadow relative ${
                notif.unread ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div>
                {notif.type === "Order Placed" && (
                  <Package className="text-blue-500" />
                )}
                {notif.type === "Packing" && (
                  <PackageOpen className="text-blue-500" />
                )}
                {notif.type === "Shipping" && (
                  <Truck className="text-orange-500" />
                )}
                {notif.type === "Out for delivery" && (
                  <Navigation className="text-teal-500" />
                )}
                {notif.type === "Delivered" && (
                  <CheckCircle className="text-green-600" />
                )}
                {notif.type === "Offer" && <Tag className="text-blue-500" />}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-gray-800">{notif.title}</h2>
                <p className="text-gray-600 text-sm">{notif.body}</p>
                <span className="text-xs text-gray-400">
                  {new Date(notif.updatedAt).toLocaleString("en-US", options)}
                </span>
              </div>
              <button
                onClick={() => handleDelete(notif._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Delete notification"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
