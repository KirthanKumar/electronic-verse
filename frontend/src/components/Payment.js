import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import { useTotalAmount } from "../context/TotalAmountContext";

const Payment = () => {
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();

  const { totalAmount } = useTotalAmount();

  const handlePaymentSubmit = async (e) => {
    try {
      e.preventDefault();
      const userEmail = localStorage.getItem("email");
      // Send request to backend to add payment details to database
      const response = await fetch("https://electronic-verse.onrender.com/checkout/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upiTransactionId: upiId,
          totalAmount: totalAmount,
          userEmail,
        }),
      });
      console.log(response);
      console.log(response.ok);
      if (response.ok) {
        // Redirect user to confirmation page or display success message
        alert("Success");
        navigate("/orders");
      } else {
        throw new Error("Failed to submit payment");
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      // Handle error - display error message to user
    }
  };

  return (
    <div className="container">
      <div className="text-center">
        <h4 className="my-3">Scan this QR to make payment.</h4>
        {/* Generate QR code with UPI ID, name, and total amount */}
        <QRCode
          value={`upi://pay?pa=skirthankumar13579-1@oksbi&pn=S Kirthan Kumar&am=${totalAmount}`}
          size={256} // Adjust size as needed
        />
      </div>
      <p className="my-3">
        ** After payment enter the UPI reference ID or UPI transaction ID for
        verification of the payment done. **
      </p>
      <form action="">
        <input
          type="text"
          placeholder="Enter UPI reference ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="form-control my-3"
          required
        />
        <button
          className="btn btn-outline-primary my-3"
          onClick={handlePaymentSubmit}
        >
          Submit Payment
        </button>
      </form>
      <p>
        Submit and please wait, you will receive a confirmation email regarding
        the payment. You can track your order status.
      </p>
    </div>
  );
};

export default Payment;
