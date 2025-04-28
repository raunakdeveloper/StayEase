module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "User must be logged in!");
    res.redirect("/login");
  }
  next();
};
