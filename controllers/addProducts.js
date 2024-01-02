const Product = require("../models/product");

const addProduct = async (req, res, next) => {
  try {
    const title = req.body.title;
    const id = req.body.id;
    const description = req.body.description;
    const price = req.body.price;
    const discountPercentage = req.body.discountPercentage;
    const stock = req.body.stock;
    const brand = req.body.brand;
    const category = req.body.category;
    const img = req.body.img;

    if (
      !title ||
      !id ||
      !description ||
      !price ||
      !discountPercentage ||
      !stock ||
      !brand ||
      !category ||
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
