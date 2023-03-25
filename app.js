const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
app.use(bodyparser.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const UserController = require("./Controllers/Auth/SignupController");
const SigninController=require("./Controllers/Auth/SigninController")
const FriendsController=require("./Controllers/FriendsController")
const MessageController=require("./Controllers/MessageController")

app.use("/", UserController);
app.use("/",SigninController)
app.use("/",FriendsController)

module.exports = app;
