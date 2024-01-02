const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./router");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

try {
  mongoose.connection
    .on("error", (err) => {
      console.error(err);
    })
    .on("open", (err) => {
      console.log(`DB connected`);
    });

  mongoose.connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1",
    { dbName: "shopping_app", serverSelectionTimeoutMS: 5000 }
  );
} catch (error) {
  console.log(error.stack);
}

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});



