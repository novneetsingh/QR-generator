import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Error from "./Pages/Error";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";

const App = () => {
  // Manage auth token using React state
  const [authToken, setAuthToken] = useState(
    sessionStorage.getItem("authToken")
  );

  // Optionally, use useEffect to update the state when sessionStorage changes
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  // Check if user is logged in
  const isLoggedIn = () => !!authToken;

  return (
    <div className="w-screen min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route
          path="/login"
          element={
            isLoggedIn() ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setAuthToken={setAuthToken} />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Fallback Route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
