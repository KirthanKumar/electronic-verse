import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ConfirmLogin from "./components/ConfirmLogin";
import { useState } from "react";
import SearchProducts from "./components/SearchProducts";
import Cart from "./components/ShoppingCart";
import ProductPage from "./components/ProductPage";
import AdminLogin from "./components/AdminLogin";
import AdminNavbar from "./components/AdminNavbar"
import Payment from "./components/Payment";
import Orders from "./components/Orders"
import Location from "./components/Location"

import React from "react";
import { TotalAmountProvider } from "./context/TotalAmountContext";
import AdminConfirmPayment from "./components/AdminConfirmPayment";
import AdminBanUsers from "./components/AdminBanUsers";
import CustomerChat from "./components/CustomerChat";
// import AdminChat from "./components/AdminChat";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const [selectedPriceFilter, setSelectedPriceFilter] = useState("");

  const handlePriceFilterSelect = (pricefilter) => {
    setSelectedPriceFilter(pricefilter);
  };

  return (
    <React.StrictMode>
      <TotalAmountProvider>
        <Router>
          {localStorage.getItem("role") === "admin" ? (
            <AdminNavbar />
          ) : (
            <>
              <Navbar
                onSelectCategory={handleCategorySelect}
                onSelectPriceFilter={handlePriceFilterSelect}
              />
              <Alert alert={alert} />
            </>
          )}

          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  selectedCategory={selectedCategory}
                  selectedPriceFilter={selectedPriceFilter}
                />
              }
            />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
            <Route
              exact
              path="/forgotpassword"
              element={<ForgotPassword showAlert={showAlert} />}
            />
            <Route
              exact
              path="/resetpassword/:token"
              element={<ResetPassword showAlert={showAlert} />}
            />
            <Route
              exact
              path="/confirmLogin"
              element={<ConfirmLogin showAlert={showAlert} />}
            />
            <Route exact path="/search" element={<SearchProducts />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/product/:productId" element={<ProductPage />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/orders" element={<Orders />} />

            <Route exact path="/admin/login" element={<AdminLogin />} />
            <Route
              exact
              path="/admin/confirmpayment"
              element={<AdminConfirmPayment />}
            />
            <Route exact path="/admin/banusers" element={<AdminBanUsers />} />
            <Route exact path="/location" element={<Location />} />
            <Route exact path="/chat" element={<CustomerChat />} />
          </Routes>
        </Router>
      </TotalAmountProvider>
    </React.StrictMode>
  );
}

export default App;
