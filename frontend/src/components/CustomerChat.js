import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const CustomerChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = io("https://electronic-verse.onrender.com");

    // Event listeners for incoming messages and chat history
    socket.on("chatHistory", handleChatHistory);
    socket.on("message", handleNewMessage);

    // Fetch chat history when component mounts
    socket.emit("getChatHistory", {
      senderEmail: localStorage.getItem("email"),
    });

    // Clean up event listeners when component unmounts
    return () => {
      socket.off("chatHistory", handleChatHistory);
      socket.off("message", handleNewMessage);
      socket.disconnect();
    };
  }, []);

  const handleChatHistory = (data) => {
    if (data.success) {
      setMessages(data.chatHistory);
      setLoading(false);
    } else {
      console.error("Failed to fetch chat history:", data.error);
    }
  };

  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    // Emit message to server
    const senderEmail = localStorage.getItem("email");
    const msgSender = "customer";
    const message = newMessage.trim();
    if (message) {
      const socket = io("https://electronic-verse.onrender.com");
      socket.emit("message", { senderEmail, msgSender, message });
      setNewMessage("");
    }
  };

  return (
    <div className="container">
      {/* Render chat messages */}
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{ textAlign: msg.msgSender === "customer" ? "left" : "right"}}
        >
          <span className="badge text-bg-primary m-3">
            <h6>{msg.message}</h6>
            <p className="text-dark">{msg.timestamp}</p>
          </span>
        </div>
      ))}

      {/* New message input */}
      <div className="container d-flex mb-5">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className=" w-100"
        />
        <button className="btn btn-outline-primary m-1" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CustomerChat;
