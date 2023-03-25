const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
app.use(bodyparser.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const SignupController = require("./Controllers/Auth/SignupController");

app.use("/", SignupController);

module.exports = app;
