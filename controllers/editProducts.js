const Product = require("../models/product");

const updatedProduct = async (req, res, next) => {
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
      img,
    } = req.body;
    await Product.findOneAndUpdate(
      { id },
      {
        title,
        description,
        price,
        discountPercentage,
        stock,
        brand,
        category,
        img,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "updated successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  updatedProduct,
};
