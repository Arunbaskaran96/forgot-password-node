const mongoose = require("mongoose");

const Urlmodel = mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Urlshortener", Urlmodel);
