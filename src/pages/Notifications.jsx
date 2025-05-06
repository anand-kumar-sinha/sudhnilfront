import React, { useState } from "react";
import { Bell, Package, Tag, Truck } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "order",
    icon: <Package className="text-blue-500" />,
    title: "Order Confirmed",
    message: "Your order #1234 has been confirmed.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "shipping",
    icon: <Truck className="text-green-500" />,
    title: "Shipped",
    message: "Your order #1234 is on the way.",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: 3,
    type: "offer",
    icon: <Tag className="text-yellow-500" />,
    title: "Flash Sale!",
    message: "Up to 50% off for the next 24 hours.",
    time: "3 hours ago",
    unread: true,
  },
];

export default function NotificationPage() {
  const [filter, setFilter] = useState("all");

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Bell className="text-gray-700" /> Notifications
      </h1>

      <div className="flex gap-2 mb-6">
        {['all', 'order', 'shipping', 'offer'].map((type) => (
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
              key={notif.id}
              className={`flex items-start gap-4 p-4 rounded-xl shadow ${
                notif.unread ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div>{notif.icon}</div>
              <div>
                <h2 className="font-semibold text-gray-800">
                  {notif.title}
                </h2>
                <p className="text-gray-600 text-sm">{notif.message}</p>
                <span className="text-xs text-gray-400">{notif.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
