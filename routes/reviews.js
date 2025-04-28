const express = require("express");
const router = express.Router({ mergeParams: true }); // Important for accessing :id from parent
const Listing = require("../models/listing");
const Review = require("../models/review");
const { reviewSchema } = require("../schema");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

// Validation middleware
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Create a review
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      req.flash("error", "Cannot find listing to review.");
      return res.redirect("/listings");
    }

    const review = new Review(req.body.review);
    listing.reviews.push(review);

    await review.save();
    await listing.save();

    req.flash("success", "Review Added Successfully!");
    res.redirect(`/listings/${listing._id}`);
  })
);

// Delete a review
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    const listing = await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });

    if (!listing) {
      req.flash("error", "Cannot find listing to delete review from.");
      return res.redirect("/listings");
    }

    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted Successfully!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
