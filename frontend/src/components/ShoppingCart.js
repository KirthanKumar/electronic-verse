import React, { useState, useEffect } from "react";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await response.json();
      setCartItems(data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const email = localStorage.getItem("email");
      await fetch(`http://localhost:5000/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const updatedCartItems = cartItems.filter(
        (item) => item.productId !== productId
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const email = localStorage.getItem("email");

      const response = await fetch(
        `http://localhost:5000/cart/update/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity, email }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }
      const updatedItem = await response.json();
      const updatedCartItems = cartItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: updatedItem.quantity }
          : item
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="container row" style={{ margin: "0 auto" }}>
          {cartItems.map((item) => (
            <div
              className="card mb-3 col-md-5 m-5"
              style={{ maxWidth: "540px" }}
              key={item.productId}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.imgurl}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.heading}</h5>
                    <p className="card-text">
                      Price: {item.price}
                      <br />
                      Quantity: {item.quantity}
                    </p>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartItem(item.productId, parseInt(e.target.value))
                      }
                    />
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Added to cart on: {item.insertionTime}
                      </small>
                    </p>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove From Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <p>Total: {calculateTotal()}</p>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
