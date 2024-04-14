// models/UserLocation.js

const mongoose = require("mongoose");

const userLocationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserLocation = mongoose.model("UserLocation", userLocationSchema);

module.exports = UserLocation;
