import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [sideImages, setSideImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://electronic-verse.onrender.com/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setMainImage(data.imgurl1);
        setSideImages([data.imgurl2, data.imgurl3, data.imgurl4, data.imgurl5]);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Handle error, maybe display an error message or redirect
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSideImageClick = (image) => {
    const updatedSideImages = sideImages.filter((img) => img !== image);
    setSideImages([mainImage, ...updatedSideImages]);
    setMainImage(image);
    };
    

    const [isInCart, setIsInCart] = useState(false);

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <img src={mainImage} alt="Main product" className="img-fluid" />
        </div>
        <div className="col mt-3">
          <div className="col-md-10">
            <h2>{product.heading}</h2>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>Features:</p>
            <ul>
              <li>{product.features1}</li>
              <li>{product.features2}</li>
              <li>{product.features3}</li>
              <li>{product.features4}</li>
            </ul>
            <button
              className="btn btn-outline-danger"
              onClick={handleToggleCart}
              disabled={!localStorage.getItem("token")}
            >
              Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="row">
          {sideImages.map((image, index) => (
            <div className="col-3" key={index}>
              <img
                src={image}
                alt="Side product"
                className="img-fluid"
                onClick={() => handleSideImageClick(image)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
