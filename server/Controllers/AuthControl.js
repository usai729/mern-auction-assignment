const express = require("express");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../Models/UserModel");
const { Business } = require("../Models/StoreModel");

const getUserInfo = async (id) => {
  const user = await User.findById(id).select("-password");

  return user;
};

exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ msg: "Please fill out all the fields", error: true });
  }

  console.log("hi");

  const { email, password } = req.body;

  const exists = await User.findOne({ email: email });

  if (exists?.length === 0 || !exists) {
    return res.json({ msg: "user does not exist", error: true });
  } else {
    let compare = await bcrypt.compare(password, exists.password);

    if (compare) {
      let token = jwt.sign(
        {
          id: exists.id,
        },
        process.env.SECRET
      );

      const user = await getUserInfo(exists.id);

      res.json({ token: token, user: user, error: false });
    } else {
      res.json({ msg: "Invalid Credentials", error: true });
    }
  }
};

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ msg: "Please fill out all the fields", error: true });
  }

  const { email, password, usertype, company } = req.body;

  const exists = await User.find({ email: email });

  if (exists?.length !== 0) {
    return res.json({ msg: "Email Already Exists", error: true });
  }

  try {
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(password, salt);

    let newUser = new User({
      email: email,
      password: hashedPassword,
      usertype: usertype,
      company: company,
    });

    let save = await newUser.save();

    if (usertype === "seller") {
      await Business.create({
        owner: newUser.id,
        businessName: company,
      });
    }

    if (save) {
      let token = jwt.sign(
        {
          id: newUser.id,
        },
        process.env.SECRET
      );

      return res.json({ token: token, error: false });
    } else {
      return res.json({ msg: "Couldn't Register", error: true });
    }
  } catch (e) {
    console.log(e);

    return res.json({ msg: "Internal Server Error", error: true });
  }
};

exports.verificationTest = (req, res) => {
  var user = req.user;

  res.send(user);
};

exports.myprofile = async (req, res) => {
  console.log("hi");
  const get = await User.findById(req.user.id).select("-password");

  res.json(get);
};
