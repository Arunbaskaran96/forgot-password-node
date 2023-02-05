const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
app.use(bodyparser.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const UserController = require("./Controllers/UserController");

app.use("/", UserController);

module.exports = app;
