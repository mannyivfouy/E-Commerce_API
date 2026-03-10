const Categories = require("../models/category.model");
const Products = require("../models/product.model");

const createCategory = async (req, res) => {
  try {
    const category = await Categories.create(req.body);

    res.status(201).json({
      message: "Category Create Successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { status } = req.body;

    const category = await Categories.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    if (status === false) {
      await Products.updateMany({ category: req.params.id }, { status: false });
    }

    res.json({
      message: "Category Update Successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    res.json({
      message: "Category Delete Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
