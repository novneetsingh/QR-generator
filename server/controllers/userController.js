const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
const mailSender = require("../utils/mailSender");

// Controller function for admin registration
exports.register = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { email, password } = req.body;

    // Check if all required fields are present
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If user exists, return a 400 status with a message
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user record
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    // Handle any other errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller function for admin login
exports.login = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { email, password } = req.body;

    // Check if all required fields are present
    if (!email || !password) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token and success message
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    // Handle any other errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send OTP to email
exports.sendResetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a random 4-digit OTP
    const emailOtp = Math.floor(1000 + Math.random() * 9000).toString();

    // create a new OTP record in the database
    await OTP.create({
      email,
      otp: emailOtp,
    });

    const emailSubject = "Password Reset OTP";
    const emailBody = `<p>Your OTP for reset password is: <strong>${emailOtp}</strong></p>`;

    await mailSender(email, emailSubject, emailBody);

    return res
      .status(200)
      .json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending OTP to email",
      error,
    });
  }
};

// reset password controller
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the provided OTP matches the one in the database
    const storedOtp = await OTP.findOne({ email });
    if (!storedOtp || storedOtp.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error resetting password",
      error,
    });
  }
};
