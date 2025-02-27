const express = require("express");

// Creating a router object
const router = express.Router();

// Importing controller functions from adminController
const {
  register,
  login,
  sendResetPasswordOtp,
  resetPassword,
} = require("../controllers/userController");

// Route for admin signup
router.post("/signup", register);

// Route for admin login
router.post("/login", login);

// Route for sending OTP for password reset
router.post("/send-reset-password-otp", sendResetPasswordOtp);

// Route for resetting password
router.post("/reset-password", resetPassword);

// Exporting the router object to be used in other parts of the application
module.exports = router;
