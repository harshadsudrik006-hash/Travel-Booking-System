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

const app = express();

/* =========================
   CORS CONFIGURATION
========================= */

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://travel-booking-harshad.web.app"
  ],
  credentials: true
}));

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());
app.use(passport.initialize());
app.use("/uploads", express.static("uploads"));

require("./config/passport")(passport);

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/users", userRoutes);

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 Smart Travel API is running..."
  });
});

/* =========================
   TEST PROTECTED ROUTE
========================= */

app.get("/api/test-protected", protect, (req, res) => {
  res.json({
    message: "🔐 Protected route accessed successfully!",
    user: req.user
  });
});

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: err.message || "Server Error"
  });
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});