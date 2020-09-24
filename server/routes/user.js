const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://jstauff:TestMongo12345@cloudsnipe.stdtd.mongodb.net/users?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We are connected!");
});
const userSchema = new mongoose.Schema({
  name: String,
});
const User = mongoose.model("User", userSchema);

// *******************
// Post Request
router.post("/", (req, res) => {
  const josh = new User({ name: req.body.name });
  josh.save(function (err, josh) {
    if (err) return console.error(err);
    console.log("Adding ", josh.name);
  });
  res.send("Create Josh!");
});

// *******************
// Get Request
router.get("/", (req, res) => {
  try {
    User.find(function (err, users) {
      if (err) return console.log(err);
      res.send(users);
    });
  } catch (error) {
    console.log("Wasnt able to connect to DB and get users.")
  }
  
});

// *******************
// Module Exports
module.exports = router;
