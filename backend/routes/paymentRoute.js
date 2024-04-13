const express = require("express");
const router = express.Router();
const CartModel = require("../models/CartModal"); // Import Cart model
const PaymentModel = require("../models/PaymentModel"); // Import Payment model
const User = require("../models/User");
const nodemailer = require("nodemailer");
const { trusted } = require("mongoose");

// POST request to handle payment submissions
router.post("/payment", async (req, res) => {
  try {
    // Extract data from request body
    const { upiTransactionId, userEmail, totalAmount } = req.body;

    // Retrieve order details from the Cart database for the given user
    const user = await User.findOne({ email: userEmail });
    const cartItems = await CartModel.find({ userId: user._id });

    // Create a new Payment document with the retrieved order details
    const orderDetails = [];
    cartItems.forEach((cart) => {
      cart.items.forEach((item) => {
        orderDetails.push({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          heading: item.heading,
        });
      });
    });

    const payment = new PaymentModel({
      userId: user._id,
      userEmail,
      upiTransactionId,
      orderDetails,
      totalAmount,
    });

    // Save the new Payment document to the database
    await payment.save();

    // Send email to admin with product details and total amount
    const transporter = nodemailer.createTransport({
      service: "gmail",
      tls: {
        rejectUnauthorized: false, // Disables SSL certificate verification
      },
      auth: {
        user: "testingmernapp@gmail.com",
        pass: "enfz hdqk kvwk janp",
      },
    });

    const mailOptions = {
      from: "testingmernapp@gmail.com",
      to: "testingmernapp@gmail.com",
      subject: "New Payment Received",
      html: `<p>New payment received from ${userEmail}.</p>
             <p>Product details:</p>
             <ul>
               ${orderDetails.map(
                 (item) =>
                   `<li>${item.heading} - ${item.quantity} x ${item.price}</li>`
               )}
             </ul>
             <p>Total amount: ${totalAmount}</p>`,
    };

    // await transporter.sendMail(mailOptions);

    // Assuming the payment is successfully processed, send a success response
    res.status(200).json({ message: "Payment submitted successfully", success: true});
  } catch (error) {
    console.error("Error submitting payment:", error);
    // If there's an error, send an error response
    res.status(500).json({ error: "Failed to submit payment", success: false });
  }
});

module.exports = router;
