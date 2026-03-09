const Booking = require("../models/Booking");
const Package = require("../models/Package");


// ============================
// Create Booking (User)
// ============================

exports.createBooking = async (req, res) => {
  try {

    const { packageId, persons = 1, travelDate } = req.body;

    if (!travelDate) {
      return res.status(400).json({
        message: "Travel date is required"
      });
    }

    const travelPackage = await Package.findById(packageId);

    if (!travelPackage) {
      return res.status(404).json({
        message: "Package not found"
      });
    }

    /* CHECK SEATS */

    if (travelPackage.availableSeats < persons) {
      return res.status(400).json({
        message: "Not enough seats available"
      });
    }

    const totalPrice = travelPackage.price * persons;

    const booking = await Booking.create({
      user: req.user._id,
      package: packageId,
      persons,
      travelDate,
      totalPrice,
      status: "Pending"
    });

    /* REDUCE SEATS */

    travelPackage.availableSeats -= persons;
    await travelPackage.save();

    res.status(201).json(booking);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// ============================
// Get My Bookings (User)
// ============================

exports.getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user._id
    })
      .populate("package", "title destination price image")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// ============================
// Delete Booking (User)
// ============================

exports.deleteBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    /* RETURN SEATS */

    const pkg = await Package.findById(booking.package);

    if (pkg) {
      pkg.availableSeats += booking.persons;
      await pkg.save();
    }

    await booking.deleteOne();

    res.json({
      message: "Booking cancelled successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



// ============================
// Admin → Get All Bookings
// ============================

exports.getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("package");

    res.json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



// ============================
// Admin → Update Booking Status
// ============================

exports.updateBookingStatus = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    const allowedStatus = [
      "Pending",
      "Approved",
      "Rejected"
    ];

    if (!allowedStatus.includes(req.body.status)) {
      return res.status(400).json({
        message: "Invalid booking status"
      });
    }

    booking.status = req.body.status;

    await booking.save();

    res.json(booking);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// ============================
// Admin Dashboard Stats
// ============================

exports.getDashboardStats = async (req, res) => {

  try {

    const bookings = await Booking.find();

    const revenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    res.json({
      revenue
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// ============================
// Popular Packages
// ============================

exports.getPopularPackages = async (req, res) => {

  try {

    const popular = await Booking.aggregate([

      {
        $group:{
          _id:"$package",
          bookings:{ $sum:1 }
        }
      },

      {
        $sort:{ bookings:-1 }
      },

      {
        $limit:5
      },

      {
        $lookup:{
          from:"packages",
          localField:"_id",
          foreignField:"_id",
          as:"package"
        }
      },

      {
        $unwind:"$package"
      }

    ]);

    res.json(popular);

  } catch (error) {

    res.status(500).json({
      message:error.message
    });

  }

};