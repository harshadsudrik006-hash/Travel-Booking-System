const express = require("express");
const router = express.Router();

const { getUsers, deleteUser } = require("../controllers/userController");

router.get("/", getUsers);

// DELETE USER
router.delete("/:id", deleteUser);

module.exports = router;