const express = require("express");
const paypal = require("paypal-rest-sdk");
const _ = require("dotenv").config();

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});
const app = express();
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
