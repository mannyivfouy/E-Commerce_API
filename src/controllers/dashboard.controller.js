const Products = require("../models/product.model");
const Categories = require("../models/category.model");
const Users = require("../models/user.model");

const getDashBoardStats = async (req, res) => {
  try {
    const totalUsers = await Users.countDocuments();
    const totalProducts = await Products.countDocuments();
    const totalCategories = await Categories.countDocuments();

    const activeUsers = await Users.countDocuments({ status: true });
    const inactiveUsers = await Users.countDocuments({ status: false });

    const activeProducts = await Products.countDocuments({status : true});
    const inactiveProducts = await Products.countDocuments({status : false});

    const activeCategories = await Categories.countDocuments({status : true});
    const inactiveCategories = await Categories.countDocuments({ status : false});

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalCategories,
      activeUsers,
      inactiveUsers,
      activeProducts,
      inactiveProducts,
      activeCategories,
      inactiveCategories
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashBoardStats };
