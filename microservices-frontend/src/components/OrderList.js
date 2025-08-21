import React from "react";
import "../styles.css";

const OrderList = ({ orders }) => (
  <div className="table-container">
    <h3>Orders</h3>
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        {/* Show name if available */}
        {orders.map(o => (
          <tr key={o.id}><td>{o.id}</td><td>{o.productName || o.productId}</td><td>{o.quantity}</td><td>${o.totalAmount.toFixed(2)}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderList;