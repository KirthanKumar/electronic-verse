const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  msgSender: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String, // or Date type if you prefer
    default: () => new Date().toLocaleString(),
  },
  imageData: {
    type: String, // You can use Buffer for binary data
    required: false, // Depending on your use case
  },
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
