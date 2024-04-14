const express = require("express");
const router = express.Router();
const CartModal = require("../models/CartModal");
const User = require("../models/User");

// Add item to cart
router.post("/add", async (req, res) => {
  const { productId, quantity, email, heading, price, imgurl } = req.body;

  try {
    let user = await User.findOne({ email: email });

    let cart = await CartModal.findOne({ userId: user._id });

    // If cart doesn't exist for the user, create a new one
    if (!cart) {
      cart = new CartModal({ userId: user._id, items: [] });
    }

    // Check if item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (existingItemIndex !== -1) {
      // Update quantity if item already exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to the cart
      cart.items.push({ productId, quantity, heading, imgurl, price });
    }

    // Save the cart
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Remove item from cart
router.delete("/remove/:productId", async (req, res) => {
  const productId = req.params.productId;
  // console.log(productId);
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    const cart = await CartModal.findOne({ userId: user._id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Remove item from cart
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // Save the updated cart
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update quantity of item in cart
router.put("/update/:productId", async (req, res) => {
  const productId = req.params.productId;
  const { quantity, email } = req.body;

  try {
    const user = await User.findOne({ email });
    const cart = await CartModal.findOne({ userId:user._id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the item in the cart and update its quantity
    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ error: "Item not found in cart" });
    }
    item.quantity = quantity;

    // Save the updated cart
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("Error updating item quantity in cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch cart items
router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    //   console.log(user);
    const cart = await CartModal.findOne({ userId: user._id });
    // console.log(cart);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
