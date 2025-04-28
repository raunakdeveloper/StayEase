const express = require("express");
const router = express.Router();
const User = require("../models/user"); // User model
const { userSchema } = require("../schema"); // Joi validation schema

// Show the Registration Form
router.get("/register", (req, res) => {
  res.render("auth/register"); // render the registration form from 'auth/register.ejs'
});

// Handle Registration Form Submission
router.post("/register", async (req, res) => {
  try {
    // Validate the form data first
    const { error, value } = userSchema.validate({ user: req.body });

    if (error) {
      req.flash("error", error.details[0].message); // Display validation errors
      return res.redirect("/register");
    }

    const { username, email, password } = value.user;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "User already exists with this email");
      return res.redirect("/register");
    }

    // Create new User
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Set success flash message and redirect
    req.flash("success", "Registration successful! Welcome to StayEase!");
    res.redirect("/listings"); // Redirect to listings page after registration
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/register"); // Redirect back to register page on error
  }
});

// Show the Login Form
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// Handle Login Form Submission
router.post("/login", async (req, res) => {
  try {
    // Validate the form data first
    const { error, value } = userSchema.validate({ user: req.body });

    if (error) {
      req.flash("error", error.details[0].message); // Display validation errors
      return res.redirect("/login");
    }

    const { username, email, password } = value.user;

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      req.flash("error", "User dosn't exists with this email");
      return res.redirect("/register");
    }

    // Set success flash message and redirect
    req.flash("success", "Login successful! Welcome to StayEase!");
    res.redirect("/listings"); // Redirect to listings page after registration
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/login"); // Redirect back to register page on error
  }
});

module.exports = router;
