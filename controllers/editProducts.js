const Product = require("../models/product");

const updatedProduct = async (req, res, next) => {
  try {
    const payload = req.body;
    console.log(payload);
    const id = req.params.id;
    const result = await Product.findOneAndUpdate({ id }, payload, {
      new: true,
    });
    console.log(result);
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
