const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Cannot find listing to review.");
    return res.redirect("/listings");
  }

  const review = new Review(req.body.review);
  review.author = req.user._id;
  listing.reviews.push(review);

  await review.save();
  await listing.save();

  req.flash("success", "Review Added Successfully!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
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
};
