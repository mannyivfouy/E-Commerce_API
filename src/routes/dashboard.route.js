const express = require("express");
const router = express.Router();
const { getDashBoardStats } = require("../controllers/dashboard.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/stats", protect, getDashBoardStats);

module.exports = router;
