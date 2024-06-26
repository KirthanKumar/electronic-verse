import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const [isInCart, setIsInCart] = useState(false);
  const { product } = props;

  const handleToggleCart = async () => {
    setIsInCart((prevIsInCart) => !prevIsInCart);
    try {
      if (!isInCart) {
        alert("Added to cart");
        await addToCart(
          product._id,
          1,
          product.heading,
          product.price,
          product.imgurl1
        ); // Add the product with quantity 1
      }
    } catch (error) {
      console.error("Error adding/removing item to/from cart:", error);
    }
  };

  const addToCart = async (productId, quantity, heading, price, imgurl) => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch("https://electronic-verse.onrender.com/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
          email,
          heading,
          imgurl,
          price,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      throw new Error("Error adding item to cart:", error);
    }
  };

  return (
      <div className="card" style={{ width: "18rem" }}>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.imgurl1}
            className="card-img-top"
            alt={product.heading}
            style={{ width: "16rem", height: "16rem", objectFit: "contain" }}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{product.heading.slice(0, 50) + "..."}</h5>
          <p className="card-text">Price: {product.price}</p>
          <button
            className="btn btn-outline-danger"
            onClick={handleToggleCart}
            disabled={!localStorage.getItem("token")}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
      </div>
  );
};

export default ProductItem;
