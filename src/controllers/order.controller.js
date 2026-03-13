const Orders = require("../models/order.model");
const Carts = require("../models/cart.model");
require("dotenv").config();

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

    const paywayLink = process.env.ABA_PAYWAY_LINK;

    const order = await Orders.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      status: "Pending",
      paymentUrl: paywayLink,
    });

    cart.items = [];
    await cart.save();

    res.json({
      message: "Order Created. Pay Using ABA PAYWAY",
      order,
      paywayLink,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { checkout };
