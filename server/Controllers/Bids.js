const { Products, Bids } = require("../Models/StoreModel");
const User = require("../Models/UserModel");

exports.bid = async (req, res) => {
  console.log("called");

  const { productID, amount } = req.body;
  const { id } = req.user;

  const BidEndTime = await Products.findById(productID).select("bidEnds");

  if (BidEndTime.bidEnds > Date.now()) {
    try {
      const findBid = await Bids.findOne({ productID: productID });

      if (findBid) {
        const update = await findBid.updateOne({
          $push: { bidders: { bidder: id, amount: amount } },
        });

        console.log(update);
      } else {
        const newBid = await Bids.create({
          productID: productID,
          bidders: [
            {
              bidder: id,
              amount: amount,
            },
          ],
        });

        console.log(newBid);
      }

      res.json("success");
    } catch (e) {
      console.log(e);
    }
  } else {
    await Bids.updateOne(
      { productID: productID },
      { $set: { biddingEnded: true } }
    );
  }
};

exports.myWinnings = async (req, res) => {
  let user_id = req.user.id;
  const winner = [];
  var winnings = [];
  const highestBid = null;

  var products = await Bids.find({
    biddingEnded: true,
    "bidders.bidder": user_id,
  });

  await Promise.all(
    products?.map(async (ele) => {
      winner.push(ele.bidders.sort((a, b) => b.amount - a.amount)[0]);
    })
  );

  await Promise.all(
    winner.map(async (w) => {
      if (w.bidder == user_id) {
        products = await Bids.aggregate([
          { $unwind: "$bidders" },
          { $match: { "bidders.bidder": w.bidder } },
          { $sort: { "bidders.bidder": 1 } },
        ]);

        await Promise.all(
          products.map(async (e) => {
            const won = await Products.find({
              _id: e.productID,
              paid: false,
            });
            winnings.push(won);
          })
        );
      }
    })
  );

  console.log(winnings);

  res.json(winnings);
};
