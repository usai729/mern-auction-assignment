const { bid, myWinnings } = require("../Controllers/Bids");
const { Verify } = require("../Middleware/VerifyToken");

const Router = require("express").Router();

Router.route("/newbid").post(Verify, bid);
Router.route("/winnings").get(Verify, myWinnings);

module.exports = Router;
