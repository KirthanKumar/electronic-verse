import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    navigate("/admin/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin/confirmpayment">
          E-Verse
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/admin/confirmpayment" ? "active" : ""
                }`}
                aria-current="page"
                to="/admin/confirmpayment"
              >
                Confirm Payment
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/admin/addproduct" ? "active" : ""
                }`}
                to="/admin/addproduct"
              >
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/admin/banusers" ? "active" : ""
                }`}
                to="/admin/banusers"
              >
                Ban Users
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link
                className="btn btn-outline-primary mx-2"
                to={"/admin/login"}
                role="button"
              >
                Login
              </Link>
            </form>
          ) : (
            <button
              onClick={handleLogout}
              className="btn btn-outline-primary mx-2"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
