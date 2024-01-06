const { addProduct } = require("./controllers/addProducts");
const { updatedProduct } = require("./controllers/editProducts");
const { deletedProduct } = require("./controllers/deleteProducts");
const { getAllProducts } = require("./controllers/productList");
const { productById } = require("./controllers/productById");
const {
  addCart,
  getCart,
  updateCart,
  EmptyCart,
} = require("./controllers/carts");

module.exports = function (app) {
  app.get("/", getAllProducts);
  app.get("/:id", productById);
  app.post("/product", addProduct);
  app.put("/products/:id", updatedProduct);
  app.delete("/products/:id", deletedProduct);

  // cart
  app.post("/cart", addCart);
  app.get("/cart/:id", getCart);
  app.put("/cart/:id", updateCart);
  app.delete("/cart", EmptyCart);
};
