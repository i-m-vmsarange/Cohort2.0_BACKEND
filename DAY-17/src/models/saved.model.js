const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "Post Id is required!!"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User Id is required!!!"],
    },
  },
  {
    timestamps: true,
  },
);

const saveModel = mongoose.model("savedposts", savedSchema);

module.exports = {
  saveModel,
};
