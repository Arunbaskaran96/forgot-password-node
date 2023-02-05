const express = require("express");
const server = express();
const bodyparser = require("body-parser");

require("./Connection/Configure");

const app = require("./app");
server.use("/", app);

server.listen(8000);
