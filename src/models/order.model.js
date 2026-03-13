const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: Number,
        price: Number,
      },
    ],
    totalPrice: Number,
    status: {
      type: String,
      enum: ["Pending", "Paid", "Canceled"],
      default: "Pending",
    },
    paymentUrl: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Orders", orderSchema);
