const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { listingSchema, reviewSchema } = require("../schema");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const methodOverride = require("method-override");

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

// Routes
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  })
);

router.get("/new", (req, res) => {
  res.render("listings/new");
});

router.post(
  "/",
  upload.single("image"),
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate("reviews");
    res.render("listings/show", { listing });
  })
);

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit", { listing });
  })
);

router.put(
  "/:id",
  upload.single("image"),
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedListing = { ...req.body.listing };

    if (req.file) {
      updatedListing.image = {
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename,
      };
    }
    await Listing.findByIdAndUpdate(id, updatedListing);
    res.redirect(`/listings/${id}`);
  })
);

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

module.exports = router;
