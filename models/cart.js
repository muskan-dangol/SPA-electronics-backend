const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity cannot be less than 1"],
    },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  }
);

const CartSchema = new Schema(
  {
    items: [ItemSchema],
    totalPrice: {
      default: 0,
      type: Number,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
