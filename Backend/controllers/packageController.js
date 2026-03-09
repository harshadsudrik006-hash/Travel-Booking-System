const Package = require("../models/Package");

// CREATE PACKAGE
exports.createPackage = async (req, res) => {

try {

const {
title,
destination,
description,
price,
duration,
category,
rating,
startDate,
endDate,
availableSeats
} = req.body;

// ⭐ parse itinerary safely
let itinerary = [];

if (req.body.itinerary) {
try {
itinerary = JSON.parse(req.body.itinerary);
} catch (err) {
console.log("Itinerary parse error:", err);
}
}

const newPackage = await Package.create({

title,
destination,
description,
price,
duration,
category,
rating,
startDate,
endDate,
availableSeats: availableSeats || 10,

// ⭐ SAVE ITINERARY
itinerary,

image: req.file ? `/uploads/${req.file.filename}` : "",

createdBy: req.user._id

});

res.status(201).json(newPackage);

} catch (error) {

console.log(error);
res.status(500).json({ message: error.message });

}

};

// GET ALL PACKAGES
exports.getAllPackages = async (req, res) => {

  try {

    const packages = await Package.find()
      .populate("createdBy", "name email");

    res.json(packages);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// GET SINGLE PACKAGE
exports.getPackageById = async (req, res) => {

  try {

    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json(packageData);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// UPDATE PACKAGE
exports.updatePackage = async (req, res) => {

  try {

    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    Object.assign(packageData, req.body);

    if (req.file) {
      packageData.image = `/uploads/${req.file.filename}`;
    }

    const updatedPackage = await packageData.save();

    res.json(updatedPackage);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// DELETE PACKAGE
exports.deletePackage = async (req, res) => {

  try {

    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    await packageData.deleteOne();

    res.json({ message: "Package deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};