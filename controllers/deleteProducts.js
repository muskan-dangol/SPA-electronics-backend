const Product = require("../models/product");

const deletedProduct = async (req, res, next) => {
  try {
    let id = req.params.id;
    const existingProduct = await Product.findById(id);
    console.log(existingProduct);
    if (!existingProduct) {
      return res.status(404).send({ error: "Product is not available!" });
    }
    await Product.findOneAndDelete({  _id: id });

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
