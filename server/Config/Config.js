const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

module.exports = connect = async () => {
  await mongoose.connect(process.env.DB_URL);

  console.log(`Connected to db at ${process.env.DB_URL}`);
};
