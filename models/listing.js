const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  title: {
    type: String,
    required: true, // e.g., "Spider Plant Baby" or "Rare Monstera Cutting"
  },
  description: {
    type: String,
  },
  image: {
    filename: String,
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-plant-default", // You can swap this with a real plant image
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-plant-default"
          : v,
    },
  },
  location: {
    type: String,
    required: true, // e.g., "Brooklyn, NY"
  },
  country: {
    type: String,
    default: "USA", // or make this optional if location is enough
  },
  status: {
    type: String,
    enum: ["Available", "Pending", "Swapped"],
    default: "Available",
  },
  offerType: {
    type: String,
    enum: ["Free", "Swap", "Sale"],
    default: "Free",
  },
  price: {
    type: Number,
    default: 0, // Used only if offerType === "Sale"
  },
  careLevel: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
  lightNeeds: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
}, { timestamps: true });

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
