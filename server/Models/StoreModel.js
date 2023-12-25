const mongoose = require("mongoose");

const BusinessesSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  businessName: {
    type: String,
  },
});
const BusinessModel = mongoose.model("Business", BusinessesSchema);

const ProductsSchema = new mongoose.Schema({
  of: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  },
  startingBid: {
    type: Number,
    required: true,
  },
  bidEnds: {
    type: Date,
  },
  productImage: {
    type: String,
  },
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const ProductsModel = mongoose.model("Products", ProductsSchema);

const BidsSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  bidders: [
    {
      bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      amount: {
        type: Number,
      },
    },
  ],
  biddingEnded: {
    type: Boolean,
    default: false,
  },
});
const BidsModel = mongoose.model("Bids", BidsSchema);

module.exports = {
  Business: BusinessModel,
  Products: ProductsModel,
  Bids: BidsModel,
};
