const { addProduct } = require("./controllers/addProducts");
const { updatedProduct } = require("./controllers/editProducts");
const { deletedProduct } = require("./controllers/deleteProducts");

module.exports = function (app) {
  app.get("/status", (req, res) => {
    const status = {
      message: "Ok",
    };
    res.status(200).json(status);
  });
  app.post("/product", addProduct);
  app.put("/update", updatedProduct);
  app.delete("/delete", deletedProduct);
};
