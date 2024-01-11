const Product = require("../models/product");

const addProduct = async (req, res, next) => {
  try {
    const {
      title,
      id,
      description,
      price,
      discountPercentage,
      stock,
      brand,
      category,
      rating,
      img,
    } = req.body;

    if (
      !title ||
      !id ||
      !description ||
      !price ||
      !stock ||
      !brand ||
      !category ||
      !rating ||
      !img
    ) {
      return res
        .status(422)
        .send({ error: "you must enter all the details of product." });
    }

    const existingProduct = await Product.findOne({
      title: title,
      id: id,
      description: description,
      price: price,
      discountPercentage: discountPercentage,
      stock: stock,
      brand: brand,
      category: category,
      rating: rating
    });
    if (existingProduct) {
      return res.status(422).send({ error: "Product is already available!" });
    }

    const product = await Product.create({
      title: title,
      id: id,
      description: description,
      price: price,
      discountPercentage: discountPercentage,
      stock: stock,
      brand: brand,
      category: category,
      rating: rating ,
      img: img,
    });
    await product.save();
    res.json({ product });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addProduct,
};
