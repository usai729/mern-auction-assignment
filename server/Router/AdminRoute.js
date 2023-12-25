const express = require("express");

const { Verify } = require("../Middleware/VerifyToken");
const {
  deleteProduct,
  deleteUser,
  getAllDetails,
} = require("../Controllers/AdminControls");

const Router = express.Router();

Router.route("/get").get(Verify, getAllDetails);
Router.route("/remove/:productId").get(Verify, deleteProduct);
Router.route("/deleteUser/:userId").delete(Verify, deleteUser);

module.exports = Router;
