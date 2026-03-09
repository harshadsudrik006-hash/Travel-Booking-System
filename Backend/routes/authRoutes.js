const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { protect } = require("../middleware/authMiddleware");
const { getProfile, registerUser, loginUser } = require("../controllers/authController");

// ============================
// Normal Auth
// ============================

router.post("/register", registerUser);
router.post("/login", loginUser);

// ============================
// Protected Profile
// ============================

router.get("/me", protect, getProfile);

// ============================
// Google Auth
// ============================

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    };

    const encodedUser = encodeURIComponent(JSON.stringify(user));

    // Redirect to deployed frontend
    res.redirect(
      `https://travel-booking-harshad.web.app/google-success?token=${token}&user=${encodedUser}`
    );
  }
);

module.exports = router;