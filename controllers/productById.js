const Product = require("../models/product");

const productById = async (req, res) => {
  try {
    let id = req.params.id;
    let productDetails = await Product.findById(id);

    res.status(200).json(productDetails);
  } catch (err) {
    // Handle errors and send an error response
    if (res) {
      res.status(500).json({
        status: false,
        error: err.message,
      });
    } else {
      console.error("Response object is undefined.");
    }
  }
};

module.exports = {
  productById,
};
