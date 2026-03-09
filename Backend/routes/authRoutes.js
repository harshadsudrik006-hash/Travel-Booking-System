const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const { getProfile } = require("../controllers/authController");

router.get("/me", protect, getProfile);

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// ============================
// Normal Auth
// ============================

router.post("/register", registerUser);
router.post("/login", loginUser);

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

    // Prepare user data
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    };

    // Encode user to send in URL
    const encodedUser = encodeURIComponent(JSON.stringify(user));

    // Redirect to frontend with token + user
    res.redirect(
      `http://localhost:5173/google-success?token=${token}&user=${encodedUser}`
    );
  }
);

module.exports = router;