// routes/userLocation.js

const express = require("express");
const router = express.Router();
const UserLocation = require("../models/UserLocation");
const User = require("../models/User")

// POST request to save user's location
router.post("/location", async (req, res) => {
  try {
    const { userEmail, latitude, longitude } = req.body;

    const user = await User.findOne({email:userEmail})

    // Create a new UserLocation document
    const userLocation = new UserLocation({
      userId:user._id,
      latitude,
      longitude,
    });

    // Save the user's location to the database
    await userLocation.save();

    res.status(201).json({ message: "User location saved successfully" });
  } catch (error) {
    console.error("Error saving user location:", error);
    res.status(500).json({ error: "Failed to save user location" });
  }
});

module.exports = router;
