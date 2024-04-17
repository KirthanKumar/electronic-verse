import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    // Fetch chat history when component mounts
    fetchChatHistory();
    // Listen for new messages
    socket.on("message", handleNewMessage);
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/chat/history/kirthankumar176@gmail.com"
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data.chatHistory);
        setLoading(false);
      } else {
        throw new Error("Failed to fetch chat history");
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      // Emit message to the server
      socket.emit("message", {
        message: newMessage,
        senderEmail: "kirthankumar176@gmail.com",
        msgSender: "admin",
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h1>Admin Chat</h1>
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

export default AdminChat;
