const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  upiTransactionId: {
    type: String,
    required: true,
  },
  orderDetails: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      heading: {
        type: String,
        requires: true,
      },
      imgurl: String,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: () => new Date().toLocaleString(),
  },
});

const PaymentModel = mongoose.model("Payment", paymentSchema);

module.exports = PaymentModel;
