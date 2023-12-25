const express = require("express");
const { Verify } = require("../Middleware/VerifyToken");
const {
  newchat,
  sendmessage,
  getAllChats,
  getChat,
} = require("../Controllers/MessageController");

const Route = express.Router();

Route.route("/newchat").post(Verify, newchat);
Route.route("/sendmsg").post(Verify, sendmessage);
Route.route("/chats").get(Verify, getAllChats);
Route.route("/c/:id").get(Verify, getChat);

module.exports = Route;
