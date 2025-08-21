import React from "react";
import "../styles.css"; // import CSS

const ProductList = ({ products }) => (
  <div className="container table-container">
    <h3>Products</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price ($)</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.price.toFixed(2)}</td>
            <td>{p.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductList;