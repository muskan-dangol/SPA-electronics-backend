const Product = require("../models/product");

const addProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      discountPercentage,
      stock,
      brand,
      category,
      rating,
      img,
    } = req.body;

    console.log(req.body)

    if (!(title && description && price && stock && brand && category && img)) {
      return res
        .status(422)
        .send({ error: "you must enter all the details of product." });
    }

    const existingProduct = await Product.findOne({
      title: { $regex: new RegExp("^" + title + "$", "i") },
      brand: { $regex: new RegExp("^" + brand + "$", "i") },
      category: { $regex: new RegExp("^" + category + "$", "i") },
    });    
    if (existingProduct) {
      return res.status(422).send({ error: "Product is already available!" });
    }    

    const product = await Product.create({
      title: title,
      description: description,
      price: price,
      discountPercentage: discountPercentage,
      stock: stock,
      brand: brand,
      category: category,
      rating: rating,
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
