import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import AdminChat from "./AdminChat"; // Import the AdminChat component

const AdminUserChat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to track selected user

  useEffect(() => {
    const socket = io("https://electronic-verse.onrender.com");

    // Event listener for receiving list of users
    socket.on("users", ({ users }) => {
      setUsers(users);
    });

    // Fetch list of users when component mounts
    socket.emit("getUsers");

    // Clean up event listener when component unmounts
    return () => {
      socket.off("users");
      socket.disconnect();
    };
  }, []);

  // Function to handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser((prevUser) => (prevUser === user ? null : user));
  };

  return (
    <div className="container">
      {/* Render list of users */}
      {users.map((user) => (
        <div className="card my-3" onClick={() => handleUserSelect(user)}>
          <div className="card-body" key={user.id} style={{ margin: "auto" }}>
            {user.name} ({user.email})
          </div>
        </div>
      ))}

      {/* Render AdminChat component if a user is selected */}
      {selectedUser && <AdminChat user={selectedUser} />}
    </div>
  );
};

export default AdminUserChat;
