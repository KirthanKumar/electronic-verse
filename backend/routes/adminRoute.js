const express = require("express");
const AdminModel = require("../models/AdminModel");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "whatsoever";
const PaymentModel = require("../models/PaymentModel"); // Import Payment model
const nodemailer = require("nodemailer");
const User = require("../models/User")

// Route 1 : Authenticate Admin using : POST "/api/admin/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;

    // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await AdminModel.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      console.log(user);

      const passwordCompare = (password === user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);

      success = true;

      res.json({
        success,
        authtoken,
        email: req.body.email,
        name: user.name,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Endpoint to fetch all orders done by the user
router.get("/confirmpayment", async (req, res) => {
  try {
    // Find all orders with the user's email
    const orders = await PaymentModel.find();
    return res.status(200).json({ orders, success: true });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Failed to fetch orders", success: false });
  }
});

// Endpoint to update order confirmation status
router.put("/confirmpayment/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { confirmed } = req.body;

    // Find the order by ID and update the confirmation status
    const order = await PaymentModel.findByIdAndUpdate(
      orderId,
      { confirmed },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const orderEmailConfirmed = await PaymentModel.findById(orderId);
    const orderDetails = orderEmailConfirmed.orderDetails;
    const totalAmount = orderEmailConfirmed.totalAmount;


    // Send email to user with product details and total amount and payment confirmation status
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
      to: `${orderEmailConfirmed.userEmail}`,
      subject: "Payment confirmation",
      html: `<p>Payment ${(orderEmailConfirmed.confirmed)?"Successful":"Failed"}.</p>
             <p>Product details:</p>
             <ul>
               ${orderDetails.map(
                 (item) =>
                   `<li>${item.heading} - ${item.quantity} x ${item.price}</li>`
               )}
             </ul>
             <p>Total amount: ${totalAmount}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "confirmation email sent to user", order });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return res.status(500).json({ error: "Failed to send email to user" });
  }
});

// Endpoint to fetch all users
router.get("/users", async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({}, { password: 0 }); // Exclude password field from the response

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: "Failed to fetch users" });
  }
});

// Endpoint to toggle the ban status of a user
router.put("/ban-user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { isBanned } = req.body;

    // Update the user's ban status in the database
    await User.findByIdAndUpdate(userId, { isBanned });

    res.status(200).json({ success: true, message: "Ban status updated successfully" });
  } catch (error) {
    console.error("Error toggling ban status:", error);
    res.status(500).json({ success: false, error: "Failed to toggle ban status" });
  }
});

module.exports = router;
