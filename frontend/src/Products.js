import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

const Products = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [category]);

  const fetchProducts = async () => {
    try {
      let url = "http://localhost:5000/products";
      if (category !== "all") {
        url += `/${category}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="row container" style={{ margin: "0 auto" }}>
      {products.map((product) => (
        <div className="col-md-4 mb-3 mt-5" key={product._id}>
          <ProductItem product={product} />
        </div>
      ))}
    </div>
  );
};

export default Products;
