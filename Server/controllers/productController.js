const productModel = require("./../models/productModel");

exports.getCreateProduct = (req, res, next) => {
  res.render("product/Products", {
    message: "",
    isLoggedIn: req.session.isLoggedIn,
  });
};
exports.postCreateProduct = (req, res, next) => {
  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  product
    .save()
    .then((response) =>
      res.render("product/Products", {
        isLoggedIn: req.session.isLoggedIn,
        message: "s",
      })
    )
    .catch((err) =>
      res.render("product/Products", {
        isLoggedIn: req.session.isLoggedIn,
        message: "f",
      })
    );
};

exports.getAllProducts = (req, res, next) => {
  productModel
    .find()
    .then((products) => {
      console.log(products);
      res.render("product/ProductsView", {
        products,
        isLoggedIn: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log("error occured"));
};
