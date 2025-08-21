import React, { useState } from "react";
import "../styles.css"; // import CSS

const OrderForm = ({ placeOrder }) => {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || quantity < 1) {
      setError("Please enter valid Product ID and Quantity");
      setSuccess("");
      return;
    }

    const newOrder = { productId, quantity: parseInt(quantity) };

    try {
       await placeOrder(newOrder); // just call API, ignore response

      setError("");
      setSuccess("Order placed successfully!");

      setProductId("");
      setQuantity(1);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to place order"
      );
      setSuccess("");
    }
  };

  return (
    <div className="container">
      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <input
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Product ID"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;