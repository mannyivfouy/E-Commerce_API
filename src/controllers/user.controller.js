const Users = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    user.fullname = req.body.fullname || user.fullname;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.role = req.body.role || user.role;
    user.status = req.body.status || user.status;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      role: updatedUser.role,
      status: updatedUser.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    await user.deleteOne();

    res.json({ message: "User Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullname, email, password, role, status } = req.body;

    const userExists = await Users.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const user = await Users.create({
      fullname,
      email,
      password,
      role: role || "User",
      status,
    });

    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
};
