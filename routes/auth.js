const express = require("express");
const router = express.Router();
const User = require("../models/user"); // User model
const { userSchema } = require("../schema"); // Joi validation schema
const bcrypt = require("bcrypt"); // For password hashing (recommended)
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");

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
  validateUser,
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        req.flash("error", "User already exists with this email");
        return res.redirect("/register");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new User
      const newUser = new User({ username, email, password: hashedPassword });
      const registeredUser = await User.register(newUser);

      req.flash("success", "Registration successful! Welcome to StayEase!");
      res.redirect("/listings");
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
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    req.flash("success", "Login successful! Welcome back!");
    res.redirect("/listings");
  }
);

module.exports = router;
