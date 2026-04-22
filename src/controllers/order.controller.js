const Orders = require("../models/order.model");
const Carts = require("../models/cart.model");

const checkout = async (req, res) => {
  try {
    const cart = await Carts.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart Is Empty" });
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalPrice = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    const order = await Orders.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      status: "Pending",
    });

    cart.items = [];
    await cart.save();

    res.json({
      message: "Order Created",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find()
      .populate("user", "fullname email")
      .populate("items.product", "productName price")
      .sort({ createdAt: -1 });
    res.json(orders);    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { checkout, getAllOrders };
