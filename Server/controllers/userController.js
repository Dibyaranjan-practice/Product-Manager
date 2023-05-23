const bcrypt = require("bcrypt");

const userModel = require("./../models/userModel");

exports.getLogin = (req, res, next) => {
  res.render("Login.ejs", { message: "", isLoggedIn: req.session.isLoggedIn });
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
      console.log(error);
    });
  if (result === "success") {
    req.session.isLoggedIn = true;
    return res.redirect("/");
  }
  res.render("Login", { message: result, isLoggedIn: req.session.isLoggedIn });
};

exports.getCreateUser = (req, res, next) => {
  res.render("CreateUser.ejs", {
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
    return res.render("Login.ejs", { isLoggedIn: req.session.isLoggedIn });
  }
  res.render("CreateUser.ejs", { message, isLoggedIn: req.session.isLoggedIn });
};
