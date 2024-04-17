import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [togglePassword, setTogglePassword] = useState(true);
  const host = "https://electronic-verse.onrender.com";

  let navigate = useNavigate();

  const passwordSeeAndUnsee = () => {
    if (togglePassword === true) {
      setTogglePassword(false);
    } else {
      setTogglePassword(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("email", json.email);
      localStorage.setItem("role", "admin");
      navigate("/admin/confirmpayment");
      alert("Logged In Successfully");
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container mt-2">
        <h2>Login to continue using iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address *
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password *
            </label>
            <input
              type={togglePassword ? "password" : "text"}
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              onMouseDown={passwordSeeAndUnsee}
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
