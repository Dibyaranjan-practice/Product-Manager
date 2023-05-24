exports.auth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/user/Login");
  }
  next();
};
