const Product = require("../models/product");

const deletedProduct = async (req, res, next) => {
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
    if (!existingProduct) {
      return res.status(404).send({ error: "Product is not available!" });
    }
    await Product.findOneAndDelete(
      { id },
      {
        title,
        description,
        price,
        discountPercentage,
        stock,
        brand,
        category,
        rating, 
        img,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  deletedProduct,
};
