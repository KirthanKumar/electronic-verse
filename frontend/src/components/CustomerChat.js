import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const CustomerChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  
  const socket = io("http://localhost:5000");
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const senderEmail = localStorage.getItem("email");
        socket.emit("getChatHistory", { senderEmail }); // Emit event to request chat history
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchChatHistory();

    // Listen for chat history event
    socket.on("chatHistory", handleChatHistory);

    // Listen for "message" event emitted by the backend
    socket.on("message", handleNewMessage);

    return () => {
      // Clean up event listeners when the component unmounts
      socket.off("chatHistory", handleChatHistory);
      socket.off("message", handleNewMessage);
    };
  }, [socket]); // Ensure the effect runs when the socket changes

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

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const senderEmail = localStorage.getItem("email");
      // Emit message to the server via WebSocket
      socket.emit("message", {
        senderEmail,
        message: newMessage,
        msgSender: "customer",
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h1>Customer Chat</h1>
      {loading ? (
        <p>Loading chat history...</p>
      ) : (
        <div>
          {messages.length === 0 ? (
            <p>No messages to display</p>
          ) : (
            <div>
              {messages.map((message, index) => (
                <div key={index}>
                  <p>
                    {message.senderId}: {message.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CustomerChat;
