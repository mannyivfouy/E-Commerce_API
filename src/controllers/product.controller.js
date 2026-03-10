const Products = require("../models/product.model");
const Categories = require("../models/category.model");

const createProduct = async (req, res) => {
  try {
    const { category } = req.body;

    const categoryExists = await Categories.findById(category);

    if (!categoryExists) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    if (!categoryExists.status) {
      return res
        .status(400)
        .json({ message: "Cannot Add Product To Inactive Category" });
    }

    const product = await Products.create(req.body);

    res.status(201).json({
      message: "Product Create Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find().populate("category");

    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { category } = req.body;

    if (category) {
      const categoryExists = await Categories.findById(category);

      if (!categoryExists) {
        return res.status(404).json({ message: "Category Not Found" });
      }

      if (!categoryExists.status) {
        return res
          .status(400)
          .json({ message: "Cannot Move Product To Inactive Category" });
      }
    }

    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.json({ message: "Product Update Successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.json({ message: "Product Delete Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
