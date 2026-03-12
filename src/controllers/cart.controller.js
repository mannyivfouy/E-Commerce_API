const Carts = require("../models/cart.model");
const Products = require("../models/product.model");

const getCart = async (req, res) => {
  try {
    const cart = await Carts.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    if (!cart) {
      return res.json({ message: "Cart Is Empty" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    let cart = await Carts.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Carts.create({
        user: req.user._id,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product,
    );

    if (itemIndex < -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Carts.findOne({ user: req.user._id });
    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({ message: "Item Not Found" });
    }

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const cart = await Carts.findOne({ user: req.user._id });

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId,
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Carts.findOne({ user: req.user._id });
    cart.items = [];
    await cart.save();

    res.json({ message: "Cart Cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
