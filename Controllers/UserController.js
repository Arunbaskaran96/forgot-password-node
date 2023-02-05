const express = require("express");
// const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Users = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Secret = "Arun";
const nodemailer = require("nodemailer");
const { findOneAndUpdate, findOne } = require("../Models/UserModel");

router.post("/user", async (req, res) => {
  if (res) {
    const checkUser = await Users.findOne({ email: req.body.email });
    if (!checkUser) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const user = new Users({
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
        });
        await user.save();
        res.status(200).json({ message: "created" });
      } catch (error) {
        res.status(500).json({ message: "something went wrong" });
        console.log(error);
      }
    } else {
      res.status(400).json({ message: "user already exist" });
    }
  } else {
    res.status(400).json({ message: "no user added" });
  }
});

router.post("/login", async (req, res) => {
  const checkUser = await Users.findOne({ email: req.body.email });
  if (checkUser) {
    const verify = await bcrypt.compare(req.body.password, checkUser.password);
    if (verify) {
      const token = jwt.sign({ email: checkUser.email }, Secret, {
        expiresIn: "30m",
      });
      res.status(200).json({ message: "correct", token });
    } else {
      res.status(400).json({ message: "incorrect" });
    }
  } else {
    res.status(400).json({ message: "no user found" });
  }
});

router.post("/forgot", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (user) {
    const forgotSec = Secret + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, forgotSec, {
      expiresIn: "10m",
    });
    const link = `http://localhost:8000/reset/${user._id}/${token}`;
    if (link) {
      const sender = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bbaa64903@gmail.com",
          pass: "ejzisgonigwvvzko",
        },
      });

      const composemail = {
        from: "bbaa64903@gmail.com",
        to: user.email,
        subject: "for changing the password",
        html: link,
      };

      sender.sendMail(composemail, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("sent");
        }
      });
    }
  } else {
    res.status(400).json({ message: "user not found" });
  }
});

router.get("/reset/:id/:token", async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id });
  if (user) {
    const forgotSec = Secret + user.password;

    try {
      const verify = jwt.verify(req.params.token, forgotSec);
      res.render("index", { email: verify.email, status: "not verified" });
    } catch (error) {
      res.json(error);
    }
  } else {
    res.status(400).json({ message: "user not exist" });
  }
});

router.post("/reset/:id/:token", async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id });
  if (user) {
    const forgotSec = Secret + user.password;

    try {
      const verify = jwt.verify(req.params.token, forgotSec);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
      const user = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            password: req.body.password,
          },
        }
      );
      res.render("home");
    } catch (error) {
      res.json({ message: "something went wrong" });
      console.log(error);
    }
  } else {
    res.status(400).json({ message: "user not exist" });
  }
});

module.exports = router;
