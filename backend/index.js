const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const http = require("http"); // Add this line
const MessageModel = require("./models/MessageModel");
const User = require("./models/User");
const AdminModel = require("./models/AdminModel");

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/sauth", require("./routes/signupAuth"));
app.use("/api/fpauth", require("./routes/forgotPassAuth"));
app.use("/api/dauth", require("./routes/deleteAccountRoute"));
app.use("/api/confirmauth", require("./routes/confirmLoginRoute"));
app.use("/products", require("./routes/fetchProductsRoute"));
app.use("/cart", require("./routes/cartRoute"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/checkout", require("./routes/paymentRoute"));
app.use("/api/user/address", require("./routes/userLocationRoute"));

const server = app.listen(port, () => {
  console.log(`iNotebook app listening on http://localhost:${port}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://kirthankumar.github.io/",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected Now only");

  // Handle incoming "getChatHistory" event
  socket.on("getChatHistory", async (data) => {
    try {
      // console.log("trying");
      const { senderEmail } = data;
      // console.log(senderEmail);

      // Find sender (user) user by email
      const user = await User.findOne({ email: senderEmail });
      // console.log(user);

      if (!user) {
        return socket.emit("chatHistoryError", { error: "User not found" });
      }

      // Find admin dynamically
      const admin = await AdminModel.findOne();

      if (!admin) {
        return socket.emit("chatHistoryError", { error: "Admin not found" });
      }

      // Retrieve chat history between the user and admin from the database
      const chatHistory = await MessageModel.find({
        $or: [
          { senderId: user._id, recipientId: admin._id },
          { senderId: admin._id, recipientId: user._id },
        ],
      }).sort({ timestamp: 1 });

      // Emit the chat history to the client
      socket.emit("chatHistory", { success: true, chatHistory });
    } catch (error) {
      console.error("Error retrieving chat history:", error);
      socket.emit("chatHistoryError", {
        error: "Failed to retrieve chat history",
      });
    }
  });

  // Handle incoming "message" event
  socket.on("message", async (data) => {
    try {
      // console.log("trying message event");
      const { senderEmail, msgSender, message } = data;

      // Find sender user by email
      const sender =
        msgSender === "customer"
          ? await User.findOne({ email: senderEmail })
          : await AdminModel.findOne();

      if (!sender) {
        return socket.emit("messageError", { error: "Sender not found" });
      }

      // Find receiver dynamically
      const receiver =
        msgSender === "customer"
          ? await AdminModel.findOne()
          : await User.findOne({ email: senderEmail });

      if (!receiver) {
        return socket.emit("messageError", { error: "Receiver not found" });
      }

      // Create a new message document and save it to the database
      const newMessage = new MessageModel({
        senderId: sender._id,
        recipientId: receiver._id,
        message,
        msgSender
      });
      await newMessage.save();

      // Broadcast the message to all connected clients
      io.emit("message", {
        success: true,
        message: message,
        msgSender
      });
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("messageError", { error: "Failed to send message" });
    }
  });

  socket.on("getUsers", async () => {
    try {
      // Fetch all users from the database
      const users = await User.find();
      // Emit the list of users to the client
      socket.emit("users", { users });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});