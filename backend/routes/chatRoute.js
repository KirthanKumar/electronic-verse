const express = require("express");
const router = express.Router();
const MessageModel = require("../models/MessageModel");
const User = require("../models/User");
const AdminModel = require("../models/AdminModel");

// Endpoint to send a chat message
router.post("/message", async (req, res) => {
  try {
    const { senderEmail, msgSender, message } = req.body;

    // Find sender user by email
    const sender =
      msgSender === "customer"
        ? await User.findOne({ email: senderEmail })
        : await AdminModel.findOne();

    if (!sender) {
      return res
        .status(404)
        .json({ success: false, error: "Sender not found" });
    }

    // Find admin dynamically
    const receiver =
      msgSender === "customer"
        ? await AdminModel.findOne()
        : await User.findOne({ email: senderEmail });

    if (!receiver) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }

    // Create a new message document and save it to the database
    const newMessage = new MessageModel({
      senderId: sender._id,
      recipientId: receiver._id,
      message,
    });
    await newMessage.save();

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
});

// Endpoint to retrieve chat history between user and admin
router.get("/history/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;

    // Find sender (user) user by email
    const user = await User.findOne({ email: userEmail });
    console.log(user._id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Find admin dynamically
    const admin = await AdminModel.findOne();
    console.log(admin._id);

    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }

    // Retrieve chat history between the user and admin from the database
    const chatHistory = await MessageModel.find({
      $or: [
        { senderId: user._id, recipientId: admin._id },
        { senderId: admin._id, recipientId: user._id },
      ],
    }).sort({ timestamp: 1 });
    console.log(chatHistory);

    res.status(200).json({ success: true, chatHistory });
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve chat history" });
  }
});

module.exports = router;
