const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    description: { type: String },
    status: { type: Boolean, default: true },
    categoty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Products", productSchema);
