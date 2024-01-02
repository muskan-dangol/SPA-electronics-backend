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
  img:
    {
        data: Buffer,
        contentType: String
    }
});

const ModelClass = mongoose.model("product", productSchema);

module.exports = ModelClass;
