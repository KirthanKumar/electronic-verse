const MessageModel = require("./models/MessageModel");
const User = require("./models/User");
const AdminModel = require("./models/AdminModel");
const socket = require("socket.io");

function initializeWebSocket(io) {
  io.on("connection", (socket) => {
    console.log("A user connected Now only");

    // Handle incoming "getChatHistory" event
    socket.on("getChatHistory", async (data) => {
      try {
        console.log("trying");
        const { senderEmail } = data;
        console.log(senderEmail);

        // Find sender (user) user by email
        const user = await User.findOne({ email: senderEmail });
        console.log(user);

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
        });
        await newMessage.save();

        // Broadcast the message to all connected clients
        io.emit("message", {
          success: true,
          message: "Message sent successfully",
        });
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("messageError", { error: "Failed to send message" });
      }
    });

    // Handle disconnections
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}

module.exports = initializeWebSocket;
