import React, { useEffect, useState } from "react";
import { getProducts, addProduct } from "../api/productApi";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  // Add a new product
  const handleAddProduct = async (product) => {
    try {
      // Post product to backend
      await addProduct(product);

      // Re-fetch the updated product list from backend
      const updated = await getProducts();
      setProducts(updated.data);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <div className="container">
        <h2>Products</h2>
      <ProductForm addProduct={handleAddProduct}/>
      <ProductList products={products}/>
    </div>
  );
};

export default Products;