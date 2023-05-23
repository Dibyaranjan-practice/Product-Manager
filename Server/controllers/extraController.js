exports.getHome = (req, res, next) => {
  res.render("Home.ejs", { isLoggedIn: req.session.isLoggedIn });
};
exports.getProducts = (req, res, next) => {
  res.render("Products.ejs", { isLoggedIn: req.session.isLoggedIn });
};
exports.getContact = (req, res, next) => {
  res.render("Contact.ejs", { isLoggedIn: req.session.isLoggedIn });
};
