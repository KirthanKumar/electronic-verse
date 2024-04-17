import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    otp: "",
  });

  const host = "https://electronic-verse.onrender.com";

  const [togglePassword, setTogglePassword] = useState(true);

  let navigate = useNavigate();

  const passwordSeeAndUnsee = () => {
    if (togglePassword === true) {
      setTogglePassword(false);
    } else {
      setTogglePassword(true);
    }
  };

  const handleSendOTP = async (e) => {
    // e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Password did not match", "danger");
      return;
    }
    const response = await fetch(`${host}/api/sauth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (!json.success) {
      props.showAlert(json.error, "danger")
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/sauth/verifyOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        otp: credentials.otp,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("name", json.name);
      localStorage.setItem("email", json.email);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
        <h2>Create an account to use iNotebook</h2>
        <form onSubmit={handleVerifyOTP}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name *
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
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
              minLength={5}
              required
              onMouseDown={passwordSeeAndUnsee}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password *
            </label>
            <input
              type={togglePassword ? "password" : "text"}
              className="form-control"
              id="cpassword"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              minLength={5}
              required
              onMouseDown={passwordSeeAndUnsee}
            />
          </div>
          <button
            // type="submit"
            className="btn btn-outline-primary"
            onClick={() => {
              handleSendOTP();
            }}
          >
            Send OTP
          </button>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Enter OTP *
            </label>
            <input
              type="text"
              className="form-control"
              id="otp"
              name="otp"
              value={credentials.otp}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Verify OTP
          </button>
        </form>
      </div>
  );
};

export default Signup;
