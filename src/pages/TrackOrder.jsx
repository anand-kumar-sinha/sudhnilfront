import React, { useContext, useEffect, useState } from "react";
import { CheckCircle, Truck, PackageOpen, Clock, MapPin } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const steps = [
  { label: "Order Placed", icon: <Clock size={20} />, key: "placed" },
  { label: "Packing", icon: <PackageOpen size={20} />, key: "packing" },
  { label: "Shipping", icon: <Truck size={20} />, key: "shipped" },
  {
    label: "Out for Delivery",
    icon: <MapPin size={20} />,
    key: "outForDelivery",
  },
  { label: "Delivered", icon: <CheckCircle size={20} />, key: "delivered" },
];

const TrackOrder = () => {
  const { backandUrl, setLoading, currency } = useContext(ShopContext);
  const [order, setOrder] = useState(null);
  const { id } = useParams();

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
    fetchOrderTracking();
  }, []);

  const fetchOrderTracking = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backandUrl}/api/order/userorders/track-order`,
        { orderId: id },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (response.data.success) {
        setOrder(response.data.order);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // Determine the current step index
  const currentStep = steps.findIndex((step) => step.label === order?.status);

  if (!order) {
    return <NotFound />;
  }
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8 border">
        <h2 className="text-lg font-semibold mb-2">Order #{order?._id}</h2>
        <p className="text-sm text-gray-600">
          Placed on: {new Date(order?.date).toLocaleString("en-US", options)}
        </p>
        <p className="text-sm text-gray-600">
          Expected Delivery:{" "}
          {new Date(
            new Date(order?.date).getTime() + 7 * 24 * 60 * 60 * 1000
          ).toLocaleString("en-US", options)}
        </p>
        <p className="text-sm text-gray-600">
          Total Amount: {order?.amount} {currency}
        </p>
        <p className="text-sm text-gray-600">
          Payment Method: {order?.paymentMethod}
        </p>
        <p className="text-sm text-gray-600">
          Total Items: {order?.items?.length}
        </p>
        <p className="text-sm text-gray-600">
          Shipping to: {order?.address?.country}, {order?.address?.state},{" "}
          {order?.address?.city}, {order?.address?.street},{" "}
          {order?.address?.zipcode}
        </p>
        <p className="text-sm text-gray-600">
          {order?.address?.firstName} {order?.address?.lastName},{" "}
          {order?.address?.phone}
        </p>
      </div>

      {/* Step Tracker */}
      <div className="flex flex-col gap-6">
        {steps.map((step, index) => {
          const isCompleted =
            steps.findIndex((s) => s.label === order?.status) > index;
          const isActive = currentStep === index;

          return (
            <div key={step.key} className="flex items-center gap-4">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white 
                  ${
                    isCompleted
                      ? "bg-green-600"
                      : isActive
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
              >
                {step.icon}
              </div>
              <div>
                <p
                  className={`font-medium ${
                    isCompleted
                      ? "text-green-600"
                      : isActive
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
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
