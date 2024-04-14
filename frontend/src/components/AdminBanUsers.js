import React, { useState, useEffect } from "react";

const AdminBanUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // You may need to include authorization headers if authentication is required
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleBanStatus = async (userId, isBanned) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/ban-user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // You may need to include authorization headers if authentication is required
          },
          body: JSON.stringify({ isBanned }),
        }
      );
      if (response.ok) {
        // Update the users list after toggling ban status
        fetchUsers();
      } else {
        throw new Error("Failed to toggle ban status");
      }
    } catch (error) {
      console.error("Error toggling ban status:", error);
    }
  };

  return (
    <div className="container">
      <h2>Users</h2>
      <div className="users-list">
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user) => (
            <div className={`card`} key={user._id}>
              <div
                className={`card-header ${
                  user.isBanned ? "bg-danger" : "bg-success"
                }`}
              >
                {user.isBanned ? "Banned" : "Active"}
              </div>
              <div className="card-body" style={{ margin: "auto" }}>
                <h5 className="card-title">User ID: {user._id}</h5>
                <p className="card-text">
                  Email: {user.email} <br />
                  Banned: {user.isBanned ? "Yes" : "No"}
                </p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => toggleBanStatus(user._id, !user.isBanned)}
                >
                  {user.isBanned ? "Unban" : "Ban"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminBanUsers;
