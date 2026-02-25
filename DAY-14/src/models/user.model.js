const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists"],
  },
  bio: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profileImg: {
    type: String,
    default:
      "https://ik.imagekit.io/vmsarange/default-image.jpg?updatedAt=1771475228977",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
