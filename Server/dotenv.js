const dotenv = require("dotenv");
dotenv.config({
  path: process.mainModule.paths[0].split("\\node_modules")[0] + "/.env",
});
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
};
