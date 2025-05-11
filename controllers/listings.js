const Listing = require("../models/listing");
const fetch = require("node-fetch");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports.listAllListings = async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};

  const allListings = await Listing.find(filter);
  res.render("listings/index", { allListings });
};

module.exports.showCreateForm = async (req, res) => {
  res.render("listings/new");
};

module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = {
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
    };
  }

  await newListing.save();
  req.flash("success", "New Listing Created Successfully!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/show", { listing, originalImageUrl });
};

module.exports.showEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Cannot edit. Listing not found.");
    return res.redirect("/listings");
  }

  res.render("listings/edit", { listing });
};

module.exports.updateListing = async (req, res) => {
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
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    req.flash("error", "Delete failed. Listing not found.");
    return res.redirect("/listings");
  }

  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
};
