const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
      required: [true, "Follower username is required!!!"],
    },
    following: {
      type: String,
      required: [true, "Followee username is required!!!"],
    },
  },
  {
    timestamps: true,
  },
);

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;
