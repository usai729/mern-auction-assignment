const { Products, Bids, Business } = require("../Models/StoreModel");
const User = require("../Models/UserModel");

exports.getAllDetails = async (req, res) => {
  var users, products, bids;

  try {
    users = await User.find();
    products = await Products.find().populate("of").exec();
    bids = await Bids.find().populate("productID").exec();

    res.json({
      users: users,
      products: products,
      bids: bids,
    });
  } catch (e) {
    console.log(e);

    return res.json({ msg: "err/internal-server-error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  if (productId) {
    try {
      let product = await Products.findById(productId);

      if (!product) {
        return res.json({ msg: "err/product-id-not-found" });
      }

      await Products.findByIdAndRemove(productId);

      return res.json({ msg: "success/product-removed" });
    } catch (e) {
      console.log(e);

      return res.json({ msg: "err/internal-server-error" });
    }
  } else {
    return res.json({ msg: "err/invalid-id" });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  if (userId) {
    try {
      let user = await User.findById(userId).limit(1);

      if (!user) {
        return res.json({ msg: "err/user-id-not-found" });
      }

      if (user.admin) {
        return res.json({ msg: "err/cannot-remove-admin" });
      }

      await User.findByIdAndRemove(userId);

      return res.json({ msg: "success/user-removed" });
    } catch (e) {
      console.log(e);

      return res.json({ msg: "err/internal-server-error" });
    }
  } else {
    return res.json({ msg: "err/invalid-id" });
  }
};
