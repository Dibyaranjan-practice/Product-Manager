//import inbuilt modules
const path = require("path");

//import 3rd party modules
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongodbstore = require("connect-mongodb-session")(session);

//import user-defined modules
const userRoutes = require("./Routes/userRoutes");
const extraRoutes = require("./Routes/extraRoutes");
const productRoutes = require("./Routes/productRoutes");
const { MONGODB_URI } = require("./dotenv");
//connection
require("./connection/db");

const app = express();
const store = new mongodbstore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "public/views");
app.use(
  session({
    secret: "my name is dibya",
    saveUninitialized: false,
    resave: false,
    store: store,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use(extraRoutes);
app.listen(process.env.PORT, () => console.log("Served started on PORT 8000"));
