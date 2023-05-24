const bcrypt = require("bcrypt");

const userModel = require("./../models/userModel");

exports.getLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.render("Home", { isLoggedIn: req.session.isLoggedIn });
  }
  res.render("user/Login.ejs", {
    message: "",
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.postLogin = async (req, res, next) => {
  let result;
  await userModel
    .findOne({ email: req.body.email })
    .then((user) =>
      bcrypt
        .compare(user.password, req.body.password)
        .then((res) => (result = "success"))
        .catch((err) => (result = "failure"))
    )
    .catch((error) => {
      result = "failure";
    });
  if (result === "success") {
    req.session.isLoggedIn = true;
    return res.redirect("/");
  }
  res.render("user/Login", {
    message: result,
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.render("user/Login", { message: "", isLoggedIn: false });
};

exports.getCreateUser = (req, res, next) => {
  res.render("user/CreateUser.ejs", {
    message: "",
    isLoggedIn: req.session.isLoggedIn,
  });
};
exports.postCreateUser = async (req, res, next) => {
  let password;
  await bcrypt
    .hash(req.body.password, 12)
    .then((pass) => (password = pass))
    .catch((err) => console.log("error occured during encryption"));
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: password,
  });
  let message;
  await user
    .save()
    .then((response) => (message = "success"))
    .catch((err) => (message = err));
  console.log(message);
  if (message === "success") {
    return res.render("user/Login.ejs", {
      isLoggedIn: req.session.isLoggedIn,
      message,
    });
  }
  res.render("user/CreateUser.ejs", {
    message,
    isLoggedIn: req.session.isLoggedIn,
  });
};
