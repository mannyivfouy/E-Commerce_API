const express = require("express");
const router = express.Router();
const { checkout, getOrders, getAllOrders } = require("../controllers/order.controller");
const { protect } = require("../middlewares/auth.middleware");

router.post("/checkout", protect, checkout);
router.get('/', protect, getAllOrders)

module.exports = router;
