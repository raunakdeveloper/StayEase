const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = 5000;
const Listing = require("./models/listing.js");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(methodOverride("_method")); // For supporting PUT and DELETE HTTP methods in forms
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.engine("ejs", ejsMate);

// MongoDB connection
const MONGO_URL = "mongodb://127.0.0.1:27017/LeafLink";
main().then(() => {
    console.log("Connected to DB");
}).catch((e) => {
    console.log("Error connecting to DB", e);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

// Root route
app.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/home.ejs", { allListings });
});
// Show all listings
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// Show the form to create a new listing
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show details of a specific listing
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// Show the form to edit a listing
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// Create a new listing (POST method)
app.post('/listings', upload.single('image'), async (req, res) => {
    const newListing = new Listing(req.body.listing);
    if (req.file) {
        newListing.image = {
            url: `/uploads/${req.file.filename}`, // Adjust path to match where files are served
            filename: req.file.filename
        };
    }

    await newListing.save();
    res.redirect('/listings');
});

// Update an existing listing (PUT method)
app.put('/listings/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const updatedListing = { ...req.body.listing };

    // If a new image was uploaded, update that as well
    if (req.file) {
        updatedListing.image = {
            url: `/uploads/${req.file.filename}`, // Adjust path as needed
            filename: req.file.filename
        };
    }

    await Listing.findByIdAndUpdate(id, updatedListing);
    res.redirect(`/listings/${id}`);
});

// Delete a listing (DELETE method)
app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

// Server listening on the specified port
app.listen(port, (req, res) => {
    console.log(`Server is listening at http://localhost:${port}`);
});
