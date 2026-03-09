const User = require("../models/User");

const getUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }
};


// DELETE USER
const deleteUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

};

module.exports = { getUsers, deleteUser };