const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cart.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/item/:itemId", protect, updateCartItem);
router.delete("/item/:itemId", protect, removeCartItem);
router.delete("/clear", protect, clearCart);

module.exports = router;
