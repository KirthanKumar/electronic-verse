import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyProfile from "./MyProfile";

export default function Navbar(props) {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    navigate("/login");
  };

  const { onSelectCategory, onSelectPriceFilter } = props;
  const handleCategorySelect = (category) => {
    onSelectCategory(category);
  };

  const handlePriceFilterSelect = (pricefilter) => {
    onSelectPriceFilter(pricefilter);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
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
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/search" ? "active" : ""
                }`}
                to="/search"
              >
                Search Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/cart" ? "active" : ""
                }`}
                to="/cart"
              >
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/orders" ? "active" : ""
                }`}
                to="/orders"
              >
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/chat" ? "active" : ""
                }`}
                to="/chat"
              >
                Chat
              </Link>
            </li>
          </ul>
          <div className="dropdown mx-1 my-1">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Price
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => handlePriceFilterSelect("leasttomost")}
                >
                  least to most
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => handlePriceFilterSelect("mosttoleast")}
                >
                  most to least
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => handleCategorySelect(null)}
                >
                  Clear
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown mx-1 my-1">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Category
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => handleCategorySelect("laptop")}
                >
                  Laptop
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => handleCategorySelect("television")}
                >
                  Television
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => handleCategorySelect("phone")}
                >
                  Phone
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => handleCategorySelect("pc-components")}
                >
                  PC Components
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => handleCategorySelect("all")}
                >
                  All
                </Link>
              </li>
            </ul>
          </div>
          {localStorage.getItem("token") && <MyProfile />}
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link
                className="btn btn-outline-primary mx-2"
                to={"/login"}
                role="button"
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-primary mx-2"
                to={"/signup"}
                role="button"
              >
                Signup
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
