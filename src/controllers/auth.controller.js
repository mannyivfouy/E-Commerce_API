const Users = require("../models/user.model");
const generateToken = require("../utils/generateToken.util");

const register = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  const userExists = await Users.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User Already Exists" });
  }

  const user = await Users.create({ fullname, username, email, password });

  res.status(201).json({
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } else {
    res.status(401).json({ message: "Invalid Email or Password" });
  }
};

module.exports = { register, login };
