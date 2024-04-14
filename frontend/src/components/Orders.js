import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userEmail = localStorage.getItem("email");
        const response = await fetch(
          `http://localhost:5000/checkout/orders?userEmail=${userEmail}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // console.log("Orders:", data.orders);
            // data.orders.forEach((order) => {
            //   console.log("Order:", order);
            //   order.orderDetails.forEach((orderDetail) => {
            //     console.log("Order Detail:", orderDetail);
            //   });
            // });
            setOrders(data.orders);
            setLoading(false);
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
          {orders &&
            orders.map((order, index) => (
              <div className="card text-center order-item m-5" key={index}>
                <div className="card-header">
                  Order ID: {order._id} <br />
                  User Email: {order.userEmail} <br />
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
                <div className="card-footer text-body-secondary">
                  {order.createdAt}
                  <br />
                  <p style={{ color: `${order.confirmed ? "green" : "red"}` }}>
                    Status:{" "}
                    {order.confirmed
                      ? "Payment received, check confirmation email"
                      : "Payment not done"}
                  </p>
                  {!order.confirmed &&
                    "** Status will get updated to 'payment received' in 5-10 minutes if payment is done **"}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
