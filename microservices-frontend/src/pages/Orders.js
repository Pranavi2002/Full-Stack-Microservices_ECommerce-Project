import React, { useEffect, useState } from "react";
import { getOrders, placeOrder } from "../api/orderApi";
import OrderList from "../components/OrderList";
import OrderForm from "../components/OrderForm";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(""); // Global error for Orders page if needed

  // Fetch orders on component mount
  useEffect(() => {
    getOrders()
      .then(res => setOrders(res.data))
      .catch(err => console.error("Failed to fetch orders:", err));
  }, []);

  // Place a new order and handle backend errors
  const handlePlaceOrder = async (order) => {
    try {
      const res = await placeOrder(order); // Axios call
      setOrders(prev => [...prev, res.data]); // Add only if success
      setError(""); // Clear any previous errors
    } catch (err) {
      // If backend sends an error message, show it in OrderForm
      if (err.response && err.response.data && err.response.data.message) {
        throw err; // Let OrderForm handle displaying this
      } else {
        setError("Something went wrong while placing order");
      }
    }
  };

  return (
    <div className="container">
    <h2>Orders</h2>
      {error && <div className="message error">{error}</div>} {/* Global error */}
      <OrderForm placeOrder={handlePlaceOrder}/>
      <OrderList orders={orders}/>
    </div>
  );
};

export default Orders;