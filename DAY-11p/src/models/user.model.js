const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: [true, "User with this email already exists"],
  },
  age: Number,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
