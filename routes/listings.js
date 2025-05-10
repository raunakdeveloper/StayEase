const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinaryConfig.js");
const upload = multer({ storage });
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware/auth");

const {
  listAllListings,
  showCreateForm,
  createListing,
  showListing,
  showEditForm,
  updateListing,
  deleteListing,
} = require("../controllers/listings");

router
  .route("/")
  .get(wrapAsync(listAllListings))
  .post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(createListing)
  );

// Show form to create new listing
router.get("/new", isLoggedIn, showCreateForm);

router
  .route("/:id")
  .get(wrapAsync(showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

// Show form to edit a listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(showEditForm));

module.exports = router;
