const Users = require("../models/user.model");
const generateToken = require("../utils/generateToken.util");

const register = async (req, res) => {
  try {
    const { fullname, username, email, password, status } = req.body;

    const userExists = await Users.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const user = await Users.create({
      fullname,
      username,
      email,
      password,
      status,
    });

    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    if (!user.status) {
      return res.status(403).json({ message: "Your Account Is Inactive" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
