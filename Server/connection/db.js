const mongoose = require("mongoose");
const { MONGODB_URI } = require("./../dotenv.js");
let db;
mongoose
  .connect(MONGODB_URI)
  .then((client) => (db = client))
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
