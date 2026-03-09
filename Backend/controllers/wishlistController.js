const User = require("../models/User");

// Add to Wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.wishlist.includes(req.params.packageId)) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    user.wishlist.push(req.params.packageId);
    await user.save();

    res.json({ message: "Added to wishlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.packageId
    );

    await user.save();

    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Wishlist
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};