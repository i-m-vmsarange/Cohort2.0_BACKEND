const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Post Id is required!!"],
    },
    likedBy: {
      type: String,
      required: [true, "Username is required"],
    },
  },
  {
    timestamps: true,
  },
);

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
