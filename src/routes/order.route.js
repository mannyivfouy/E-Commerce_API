const express = require("express");
const router = express.Router();
const { checkout } = require("../controllers/order.controller");
const { protect } = require("../middlewares/auth.middleware");

router.post("/checkout", protect, checkout);

module.exports = router;
