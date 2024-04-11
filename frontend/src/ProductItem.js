import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

const ProductItem = (props) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { product } = props;

  const handleToggleWishlist = () => {
    setIsInWishlist((prevIsInWishlist) => !prevIsInWishlist);
    if (!isInWishlist) {
      alert("Added to wishlist");
      // Add product to wishlist functionality goes here
    } else {
      alert("Removed from wishlist");
      // Remove product from wishlist functionality goes here
    }
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={product.imgurl1}
        className="card-img-top"
        alt={product.heading}
        style={{ width: "250px", height: "200px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.heading}</h5>
        <p className="card-text">Price: {product.price}</p>
        <button
          className="btn btn-outline-danger"
          onClick={handleToggleWishlist}
        >
          <FontAwesomeIcon icon={isInWishlist ? fasHeart : farHeart} />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
