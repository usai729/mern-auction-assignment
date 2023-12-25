const fs = require("fs");
const mongoose = require("mongoose");

const { Business, Products, Bids } = require("../Models/StoreModel");

const setBiddingEndValue = async (id) => {
  const BidEndTime = await Products.findById(id).select("bidEnds");

  if (BidEndTime.bidEnds < Date.now()) {
    await Bids.updateOne({ productID: id }, { $set: { biddingEnded: true } });
  }
};

exports.add = async (req, res) => {
  const { title, desc, date, time, min } = req.body;
  const filename = req.file.filename;
  const id = req.user.id;

  const business = await Business.findOne({ owner: id }).select("_id");

  try {
    const newProduct = new Products({
      of: business._id,
      startingBid: min,
      bidEnds: new Date(date + "T" + time),
      productImage: filename,
      title: title,
      desc: desc,
    });

    await newProduct.save();

    res.redirect("http://localhost:3000/myprofile");
  } catch (e) {
    console.log(e);
  }
};

exports.getMyProducts = async (req, res) => {
  const id = req.user.id;

  const business = await Business.findOne({ owner: id }).select("_id");
  const products = await Products.find({ of: business?._id });

  products.map(async (ele) => {
    await setBiddingEndValue(ele._id);
  });

  res.json(products);
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;

  await setBiddingEndValue(id);

  const product = await Products.findById(id).populate("of");

  const highestBid = await Bids.aggregate([
    { $match: { productID: mongoose.Types.ObjectId.createFromHexString(id) } },
    { $unwind: "$bidders" },
    { $sort: { "bidders.amount": -1 } },
    { $limit: 1 },
  ]);

  res.json({ product: product, bids: highestBid[0]?.bidders.amount });
};

exports.home = async (req, res) => {
  try {
    const products = await Products.find({ paid: false || null })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("of");

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.allProducts = async (req, res) => {
  try {
    const productList = await Products.find({ paid: false || null })
      .populate("of")
      .sort({ createdAt: -1 })
      .populate("of");

    res.json(productList);
  } catch (e) {
    console.log(e);
  }
};

exports.searchRes = async (req, res) => {
  const { query } = req.params;

  try {
    const results = await Products.find({
      $and: [
        { paid: false || null },
        {
          $or: [
            { title: new RegExp(query, "i") },
            { desc: new RegExp(query, "i") },
          ],
        },
      ],
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  const image = await Products.findById(id).select("productImage");
  const del = await Products.findByIdAndDelete(id);

  fs.unlink("./Assets/" + image.productImage, (err) => {
    if (err) {
      console.log(err);
    }

    console.log("Deleted");
  });

  if (del) res.redirect("http://localhost:3000/myprofile");
};
