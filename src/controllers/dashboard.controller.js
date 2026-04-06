const Products = require("../models/product.model");
const Categories = require("../models/category.model");
const Users = require("../models/user.model");

const getDashBoardStats = async (req, res) => {
  try {
    const totalUsers = await Users.countDocuments();
    const totalProducts = await Products.countDocuments();
    const totalCategories = await Categories.countDocuments();
    
    res.status(200).json({
      totalUsers,
      totalProducts,
      totalCategories
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getDashBoardStats}
