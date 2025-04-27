const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

const initDB = async () => {
  try {
    // Optional: Clear existing data from the collection (if you want to reset)
    await Listing.deleteMany({});
    console.log("Existing data cleared");

    // Insert the new data from initData
    await Listing.insertMany(initData.data);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  }
};
initDB();
