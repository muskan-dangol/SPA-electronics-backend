const { addProduct } = require("./controllers/addProducts");
const { updatedProduct } = require("./controllers/editProducts");
const { deletedProduct } = require("./controllers/deleteProducts");
const {getAllProducts} = require("./controllers/productList")

module.exports = function (app) {
  app.get("/", getAllProducts );
  app.post("/product", addProduct);
  app.put("/products/:id", updatedProduct);
  app.delete("/products/:id", deletedProduct);
};
