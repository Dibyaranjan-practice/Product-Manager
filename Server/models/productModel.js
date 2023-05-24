const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const productModel = mongoose.model("Products", productSchema);
module.exports = productModel;
