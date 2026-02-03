const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  description: String,
  occupation: String,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
