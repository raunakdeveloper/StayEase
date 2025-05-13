const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const path = require("path");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("Existing data cleared");

    const listingsWithGeo = [];

    for (let listing of initData.data) {
      await sleep(1000); // Wait 1 second between requests

      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          listing.location
        )}`,
        {
          headers: {
            "User-Agent": "StayEaseApp/1.0 (grsraunak@gmail.com)",
          },
        }
      );

      const geoData = await geoRes.json();

      let geometry = null;
      if (geoData.length > 0) {
        geometry = {
          type: "Point",
          coordinates: [parseFloat(geoData[0].lon), parseFloat(geoData[0].lat)],
        };
      }

      listingsWithGeo.push({
        ...listing,
        owner: "6811bf9df4c6d63a846294e7",
        geometry,
      });

      console.log(`Geocoded: ${listing.title}`);
    }

    await Listing.insertMany(listingsWithGeo);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  }
};

initDB();
