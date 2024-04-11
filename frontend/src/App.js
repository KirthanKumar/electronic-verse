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
    <Router>
      <Navbar
        onSelectCategory={handleCategorySelect}
        onSelectPriceFilter={handlePriceFilterSelect}
      />
      <Alert alert={alert} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              selectedCategory={selectedCategory}
              selectedPriceFilter={selectedPriceFilter}
            />
          }
        />
        <Route exact path="/login" element={<Login showAlert={showAlert} />} />
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
          path="/resetpassword/:token"
          element={<ResetPassword showAlert={showAlert} />}
        />
        <Route
          path="/confirmLogin"
          element={<ConfirmLogin showAlert={showAlert} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
