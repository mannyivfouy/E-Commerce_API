const Users = require("../models/user.model");

const getAllUsers = async (req, res) => {
  const users = await Users.find().select("-password");
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await Users.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  res.json(user);
};

const updateUser = async (req, res) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  user.fullname = req.body.fullname || user.fullname;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;
  user.role = req.body.role || user.role;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    fullname: updatedUser.fullname,
    email: updatedUser.email,
    role: updatedUser.role,
  });
};

const deleteUser = async (req, res) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  await user.deleteOne;
  res.json({ message: "User Deleted" });
};

const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  const userExists = await Users.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User Already Exists" });

  const user = await Users.create({
    fullname,
    email,
    password,
    role: role || "User",
  });

  res.status(201).json({
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
};
