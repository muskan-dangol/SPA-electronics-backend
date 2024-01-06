const Product = require("../models/product");
const Cart = require("../models/cart");

const cartsById = async (id) => {
  const carts = await Cart.findById(id);
  return carts;
};

const carts = async () => {
  const carts = await Cart.find();
  return carts;
};

const cartBox = async (id) => {
  const carts = await Cart.findById(id);
  return carts;
};

const addCart = async (req, res) => {
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
    let productDetails = await Product.findById(productId);
    let cart = await carts();
    let totalCart = (await Cart.find()).length;
    const cartData = {
      items: [
        {
          productId: productId,
          quantity: quantity,
          total: parseInt(productDetails.price * quantity),
          price: productDetails.price,
        },
      ],
      totalPrice: parseInt(productDetails.price * quantity),
    };
    cart = await Cart.create(cartData);
    let data = await cart.save();
    res.status(200).json({
      type: "success",
      msg: "Created Successful",
      data: data,
      totalCart: totalCart,
      quantity: quantity,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err: error,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const id = req.params.id;
    let carts = await Cart.find();
    let cart = await cartsById(id);

    console.log(cart);
    if (!cart) {
      return res.status(400).json({
        type: "Invalid",
        msg: "Cart Not Found",
      });
    }
    res.status(200).json({
      status: true,
      data: cart,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err: err,
    });
  }
};

const updateCart = async (req, res) => {
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
    const id = req.params.id;
    let cart = await cartBox(id);
    let productDetails = await Product.findById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid request",
      });
    }
    if (quantity) {
      cart.items.push({
        productId: productId,
        quantity: quantity,
        price: productDetails.price,
        total: parseInt(productDetails.price * quantity),
      });
      cart.totalPrice = cart.items
        .map((item) => item.total)
        .reduce((acc, next) => acc + next);
    } else {
      return res.status(400).json({
        type: "Invalid",
        msg: "Invalid request",
      });
    }
    let data = await cart.save();
    res.status(200).json({
      type: "success",
      mgs: "Process Successful",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err: err,
    });
  }
};

const EmptyCart = async (req, res) => {
  try {
    const result = await Cart.deleteMany();
    if (result.deletedCount > 0) {
      res.status(200).json({
        type: "success",
        deletedCart: result.deletedCount,
        msg: "All Carts Have Been Deleted",
      });
    } else {
      res.status(404).json({
        type: "Not Found",
        msg: "No Carts Found to Delete",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err: err,
    });
  }
};


module.exports = {
  addCart,
  getCart,
  updateCart,
  EmptyCart,
};
