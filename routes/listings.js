const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { listingSchema } = require("../schema");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn } = require("../middleware/auth");

// Validation middleware
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// ================= Routes =================

// Show all listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  })
);

// Show form to create new listing
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// Create a new listing
router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);

    // Handle uploaded image if present
    if (req.file) {
      newListing.image = {
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename,
      };
    }

    await newListing.save();
    req.flash("success", "New Listing Created Successfully!");
    res.redirect("/listings");
  })
);

// Show a specific listing
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
  })
);

// Show form to edit a listing
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Cannot edit. Listing not found.");
      return res.redirect("/listings");
    }

    res.render("listings/edit", { listing });
  })
);

// Update a listing
router.put(
  "/:id",
  isLoggedIn,
  upload.single("image"),
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedData = { ...req.body.listing };

    if (req.file) {
      updatedData.image = {
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename,
      };
    }

    const updatedListing = await Listing.findByIdAndUpdate(id, updatedData);

    if (!updatedListing) {
      req.flash("error", "Update failed. Listing not found.");
      return res.redirect("/listings");
    }

    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
  })
);

// Delete a listing
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      req.flash("error", "Delete failed. Listing not found.");
      return res.redirect("/listings");
    }

    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listings");
  })
);

module.exports = router;
