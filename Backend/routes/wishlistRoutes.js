const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

router.post("/:packageId", protect, addToWishlist);
router.delete("/:packageId", protect, removeFromWishlist);
router.get("/", protect, getWishlist);

module.exports = router;