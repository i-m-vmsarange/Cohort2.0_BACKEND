const mongoose = require("mongoose");

// 1. Create schema first

const userSchema = new mongoose.Schema({
  username: String,
  company: String,
  address: String,
  age: Number,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
