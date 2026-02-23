const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    password: [true, "Password is required"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/vmsarange/default-image.jpg?updatedAt=1771475228977",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
