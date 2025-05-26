import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { backandUrl, token, currency, setLoading } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      setLoading(true);
      const response = await axios.post(
        backandUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        // Transform the API data to match your component's expectations
        const transformedOrders = response.data.orders.map(order => ({
          ...order.item, // Spread the item properties
          status: order.status,
          payment: order.payment,
          paymentMethod: order.paymentMethod,
          date: order.date,
          orderId: order._id,
          productId: order.item.productId, // Keep the nested productId
          price: order.amount // Assuming amount is the price
        }));
        
        setOrderData(transformedOrders.reverse());
      }
    } catch (error) {
      toast.error("Failed to load orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={item?.productId?.image?.[0]}
                  alt="product"
                />
                <div className="flex flex-col">
                  <p className="sm:text-base font-medium">
                    {/* Product name might not be in the API response */}
                    Order #{item?.orderId}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency}
                      {item?.price}
                    </p>
                    <p>Quantity: {item?.quantity}</p>
                    <p>Size: {item?.size}</p>
                  </div>
                  <p className="mt-1">
                    Date: <span className="text-gray-400">
                      {new Date(item?.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment: <span className="text-gray-400">
                      {item?.paymentMethod} ({item?.payment ? "Paid" : "Pending"})
                    </span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item?.status}</p>
                </div>
                <button
                  onClick={() => navigate(`/track-order/${item?.orderId}`)}
                  className="border px-4 py-2 text-sm font-medium rounded-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;