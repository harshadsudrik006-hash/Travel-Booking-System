const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  deleteBooking,
  getAllBookings,
  updateBookingStatus,
  getDashboardStats,
  getPopularPackages
} = require("../controllers/bookingController");

const { protect, admin } = require("../middleware/authMiddleware");


// User Routes
router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.delete("/:id", protect, deleteBooking);


// Admin Routes
router.get("/", protect, admin, getAllBookings);
router.put("/:id/status", protect, admin, updateBookingStatus);
router.get("/stats/dashboard", protect, admin, getDashboardStats);
router.get("/stats/popular", protect, admin, getPopularPackages);

module.exports = router;