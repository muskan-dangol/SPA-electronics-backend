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

const { getAllUsers } = require("./controllers/user");
const { login, signup} = require("./controllers/auth/index")

module.exports = function (app) {
  app.get("/products", getAllProducts);
  app.get("/products/:id", productById);
  app.post("/products", addProduct);
  app.put("/products/:id", updatedProduct);
  app.delete("/products/:id", deletedProduct);

  // cart
  app.post("/cart", addCart);
  app.get("/cart/:id", getCart);
  app.put("/cart/:id", updateCart);
  app.delete("/cart", EmptyCart);

  // users
 
  app.get('/users', getAllUsers);
  app.post("/signin", login);
  app.post("/signup", signup);
};
