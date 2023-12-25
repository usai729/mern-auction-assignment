const express = require("express");
const { body } = require("express-validator");

const {
  login,
  signup,
  verificationTest,
  myprofile,
} = require("../Controllers/AuthControl");
const { Verify } = require("../Middleware/VerifyToken");

const Router = express.Router();

Router.route("/login").post(
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  login
);
Router.route("/signup").post(
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  signup
);
Router.route("/testverification").get(Verify, verificationTest);
Router.route("/myprofile").get(Verify, myprofile);

module.exports = Router;
