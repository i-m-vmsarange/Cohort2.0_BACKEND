const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "user with given username already exists"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "user with given email already exists"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  bio: {
    type: String,
  },
  profile_image: {
    type: String,
    default:
      "https://ik.imagekit.io/vmsarange/default-image.jpg?updatedAt=1771475228977",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
