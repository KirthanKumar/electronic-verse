import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders from the backend API
        const response = await fetch(
          "https://electronic-verse.onrender.com/api/admin/confirmpayment"
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.success) {
            setOrders(data.orders);
          } else {
            throw new Error("Failed to fetch orders");
          }
        } else {
          throw new Error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleChangeStatus = async (orderId, confirmed) => {
    try {
      // Toggle the confirmed status
      const newConfirmedStatus = !confirmed;
      // Send a PUT or POST request to update the confirmed status
      const response = await fetch(
        `https://electronic-verse.onrender.com/api/admin/confirmpayment/${orderId}`,
        {
          method: "PUT", // Use PUT or POST based on your backend implementation
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ confirmed: newConfirmedStatus }),
        }
      );
      if (response.ok) {
        // Update the local state if the request is successful
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, confirmed: newConfirmedStatus }
              : order
          )
        );
      } else {
        throw new Error("Failed to change order status");
      }
    } catch (error) {
      console.error("Error changing order status:", error);
    }
  };

  return (
    <div className="container">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>
          {localStorage.getItem("token")
            ? "No order history"
            : "Login to use this functionality."}
        </p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div className="card text-center order-item m-5" key={index}>
              {/* Order details */}
              <div className="card-header">
                User Email: {order.userEmail} <br />
                User Id: {order.userId}
                <br />
                Order ID: {order._id} <br />
                Total Amount: {order.totalAmount} <br />
                UPI Transaction ID: {order.upiTransactionId}
              </div>
              <div className="card-body">
                <h5 className="card-title">Order Details:</h5>
              </div>
              {order.orderDetails.map((item, idx) => (
                <div
                  className="card mb-3"
                  style={{ maxWidth: "540px", margin: "auto " }}
                  key={idx}
                >
                  {/* Order item details */}
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
                          Quantity: {item.quantity} <br /> Price: {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Order footer */}
              <div className="card-footer text-body-secondary">
                {order.createdAt}
                <br />
                <p style={{ color: `${order.confirmed ? "green" : "red"}` }}>
                  Status:{" "}
                  {order.confirmed
                    ? "Payment done"
                    : "Payment not done"}
                </p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleChangeStatus(order._id, order.confirmed)}
                >
                  Change Status
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
