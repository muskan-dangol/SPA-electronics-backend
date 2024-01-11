const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, unique: false },
  id: { type: Number, autoIncrement: true, primaryKey: true },
  description: { type: String },
  price: { type: Number },
  discountPercentage: { type: Number },
  stock: { type: Number },
  brand: { type: String },
  category: { type: String },
  rating: {
    type: Number,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
