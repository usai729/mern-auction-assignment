const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    default: "buyer",
  },
  company: {
    type: String,
    default: null,
  },
  dp: {
    type: String,
  },
  about: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", UserSchema);
User.createIndexes();

module.exports = User;
