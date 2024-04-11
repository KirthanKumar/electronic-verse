import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

const Products = ({ category, sort }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsBasedOnCategory();
    if (sort && !category) {
      fetchProductsBySorting();
    }
    if ((category && !sort) || !sort) {
      fetchProductsBasedOnCategory();
    }
    if (category && sort) {
      fetchProductsBasedOnCategoryAndSorting();
    }
    // eslint-disable-next-line
  }, [category, sort]);

  const fetchProductsBasedOnCategory = async () => {
    try {
      let url = "http://localhost:5000/products/category";
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

  const fetchProductsBySorting = async () => {
    try {
      console.log(sort);
      const response = await fetch(
        `http://localhost:5000/products/sort?sortOption=${sort}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const fetchProductsBasedOnCategoryAndSorting = async () => {
    try {
      console.log(sort);
      let url = `http://localhost:5000/products/categorysort?sortOption=${sort}&category=${category}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
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
