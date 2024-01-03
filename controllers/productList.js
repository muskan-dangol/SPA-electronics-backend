const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const productList = await Product.find();
    res.json(productList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getAllProducts };
