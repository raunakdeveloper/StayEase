const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      filename: String,
      url: {
        type: String,
        default:
          "https://plus.unsplash.com/premium_photo-1661913412680-c274b6fea096?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhY2glMjBob21lfGVufDB8fDB8fHww",
        set: (v) =>
          v === ""
            ? "https://plus.unsplash.com/premium_photo-1661913412680-c274b6fea096?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhY2glMjBob21lfGVufDB8fDB8fHww"
            : v,
      },
    },
    location: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "USA",
    },
    price: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      }
    ]
  },
  { timestamps: true }
);

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
