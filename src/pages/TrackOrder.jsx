import React, { useContext, useEffect, useState } from "react";
import { CheckCircle, Truck, Package, Clock, MapPin } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const steps = [
  { label: "Order Placed", icon: <Clock size={20} />, key: "placed" },
  { label: "Shipped", icon: <Truck size={20} />, key: "shipped" },
  { label: "Out for Delivery", icon: <MapPin size={20} />, key: "outForDelivery" },
  { label: "Delivered", icon: <CheckCircle size={20} />, key: "delivered" },
];

const TrackOrder = () => {
  const {backandUrl} = useContext(ShopContext)
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrderTracking();
  }, []);

  const fetchOrderTracking = async () => {
    try {
      const response = await axios.get(`${backandUrl}/api/orders/track/123456789`, {
        headers: { token: localStorage.getItem("token") },
      });
      if (response.data.success) {
        setOrder(response.data.order);
      } else {
        toast.error("Failed to load order");
      }
    } catch (error) {
      toast.error("Error fetching order tracking");
    }
  };

  if (!order) return <div className="p-6 text-center">Loading...</div>;

  const currentStep = steps.findIndex((step) => !order[step.key]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8 border">
        <h2 className="text-lg font-semibold mb-2">Order #{order._id}</h2>
        <p className="text-sm text-gray-600">Placed on: {order.createdAt}</p>
        <p className="text-sm text-gray-600">Expected Delivery: {order.expectedDelivery}</p>
        <p className="text-sm text-gray-600">Shipping to: {order.shippingAddress}</p>
      </div>

      {/* Step Tracker */}
      <div className="flex flex-col gap-6">
        {steps.map((step, index) => {
          const isCompleted = order[step.key];
          const isActive = currentStep === index;

          return (
            <div key={step.key} className="flex items-center gap-4">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white 
                ${isCompleted ? "bg-green-600" : isActive ? "bg-blue-500" : "bg-gray-300"}`}
              >
                {step.icon}
              </div>
              <div>
                <p className={`font-medium ${isCompleted ? "text-green-600" : isActive ? "text-blue-600" : "text-gray-500"}`}>
                  {step.label}
                </p>
                {isCompleted && (
                  <p className="text-xs text-gray-500">✓ Completed</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackOrder;
