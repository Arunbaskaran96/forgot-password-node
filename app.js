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

app.use("/", UserController);
app.use("/",SigninController)

module.exports = app;
