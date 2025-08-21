import React, { useState } from "react";
import "../styles.css"; // import CSS

const ProductForm = ({ addProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !stock) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    const newProduct = { name, price: parseFloat(price), stock: parseInt(stock) };

    addProduct(newProduct)
      .then((res) => {
        setError("");
        setSuccess("Product added successfully!");
        setName("");
        setPrice("");
        setStock("");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to add product");
        setSuccess("");
      });
  };

  return (
    <div className="container">
      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;