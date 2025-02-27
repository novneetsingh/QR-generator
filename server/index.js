const express = require("express");
const app = express();
require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/userRoutes");

// Define port number
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON requests

require("./config/database").dbconnect(); // Connect to database

// Route setup
app.use("/user", userRoutes); // User routes

// Default route
app.get("/", (req, res) => {
  res.send("<h1>Hello Hi Bye</h1>"); // Simple response for root route
});

// Activate server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT); // Log server activation
});
