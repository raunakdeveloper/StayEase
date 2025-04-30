const express = require("express");
const router = express.Router();
const User = require("../models/user"); // User model
const { userSchema } = require("../schema"); // Joi validation schema
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError"); // Make sure ExpressError is correctly imported
const { saveRedirectUrl } = require("../middleware/auth");

// Validation middleware
const validateUser = (req, res, next) => {
  let { error } = userSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Show Registration Form
router.get("/register", (req, res) => {
  res.render("auth/register");
});

// Handle Registration
router.post(
  "/register",
  wrapAsync(async (req, res, next) => {
    try {
      let { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        req.flash("error", "User already exists with this email");
        return res.redirect("/register");
      }

      // Create new User
      const newUser = new User({ username, email });

      // Register user with password
      await User.register(newUser, password); // passport-local-mongoose handles hashing

      req.login(newUser, (err) => {
        // Use req.login, not res.login
        if (err) {
          return next(err);
        }
        req.flash("success", "Registration successful! Welcome to StayEase!");
        res.redirect("/listings");
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Something went wrong. Please try again.");
      res.redirect("/register");
    }
  })
);

// Show Login Form
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// Handle Login
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    let redirectUrl = res.locals.redirectUrl || "/listings"; // Use the redirectUrl from saveRedirectUrl middleware
    res.redirect(redirectUrl);
  }
);

// Logout Route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logout successful!");
    res.redirect("/listings");
  });
});

module.exports = router;
