const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:Arun@cluster0.v3nsavo.mongodb.net/?retryWrites=true&w=majority",
  (err) => {
    if (err) {
      console.log("something went wrong" + err);
    } else {
      console.log("connected");
    }
  }
);
