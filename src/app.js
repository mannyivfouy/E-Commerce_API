const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/categories", require("./routes/category.route"));
app.use("/api/products", require("./routes/product.route"));
app.use("/api/carts", require("./routes/cart.route"));
app.use("/api/orders", require("./routes/order.route"));

module.exports = app;
