const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const randomstring = require("randomstring");

const urlmodel = require("../Models/Urlshortener");

router.post("/create", (req, res) => {
  const newUrl = new urlmodel({
    longUrl: req.body.longUrl,
    shortUrl: randomstring.generate(5),
  });
  newUrl
    .save()
    .then((result) => {
      res.status(200).json({ message: "created" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

router.get("/:url", (req, res) => {
  const url = urlmodel.findOne({ shortUrl: req.params.url }).then((result) => {
    console.log(result);
    res.redirect(result.longUrl);
  });
});

router.post("/:url", (req, res) => {
  const url = urlmodel
    .findOne({ shortUrl: req.params.url })
    .then((result) => {
      res.redirect(result.longUrl);
      res.json({ message: "switched" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

module.exports = router;
