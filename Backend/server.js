const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const passport = require("passport");

const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const userRoutes = require("./routes/userRoutes");

const { protect } = require("./middleware/authMiddleware");

dotenv.config();
connectDB();



// Initialize App
const app = express();


// Middleware
app.use(cors()); // Allow frontend connection
app.use(express.json()); // Parse JSON body
app.use(passport.initialize()); // Initialize Passport for Google Auth
app.use("/uploads", express.static("uploads"));

// Passport Config
require("./config/passport")(passport);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/users", userRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 Smart Travel API is running...",
  });
});

// Test Protected Route
app.get("/api/test-protected", protect, (req, res) => {
  res.json({
    message: "🔐 Protected route accessed successfully!",
    user: req.user,
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});