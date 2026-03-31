const postModel = require("../models/post.model");
const likeModel = require("../models/likes.model");
const followModel = require("../models/follow.model");
const IMAGEKIT = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const { default: mongoose } = require("mongoose");
const { saveModel } = require("../models/saved.model");

const imagekit = new IMAGEKIT({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});

async function createPost(req, res) {
  const response = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer, "file")),
    fileName: req.file.originalname,
    folder: "day-17",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: response.url,
    user: req.user.id,
  });

  res.status(200).json({
    message: "File uploaded successfully!!!",
    post,
  });
}
async function getPosts(req, res) {
  const userId = req.user.id;

  const posts = await postModel.findOne({
    user: userId,
  });

  if (!posts) {
    return res.status(404).json({
      message: "No posts found for logged in user!!!",
    });
  }
  res.status(200).json({
    message: "Posts fetched successfully!!!",
    posts: {
      posts,
    },
  });
}
async function getPostDetails(req, res) {
  const postId = req.params.postId;
  const userId = req.user.id;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post with the given id not found!!!",
    });
  }
  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Post does not belong to the signed in user!!!",
    });
  }
  return res.status(200).json({
    message: "Post fetched successfully!!!",
    post: {
      post,
    },
  });
}
async function likePost(req, res) {
  const userId = req.user.id;
  const username = req.user.username;
  const postId = req.params.postId;

  const isLiked = await likeModel.findOne({
    likedBy: `${username}`,
    postId: postId,
  });

  if (isLiked) {
    return res.status(409).json({
      message: `${username} has already liked post with Id ${postId}`,
    });
  }

  const like = await likeModel.create({
    postId,
    likedBy: username,
  });

  const response = await updateLikeCount(postId);

  return res.status(201).json({
    message: `${postId} is liked by ${username}`,
    response,
  });
}
async function dislikePost(req, res) {
  const postId = req.params.postId;
  const userId = req.user.id;
  const username = req.user.username;

  const isLiked = await likeModel.findOne({
    $and: [
      {
        likedBy: username,
      },
      {
        postId,
      },
    ],
  });
  console.log(isLiked);
  if (!isLiked) {
    return res.status(400).json({
      message: "User  has not liked the post...",
    });
  }

  const deleteLikeId = await likeModel.findByIdAndDelete({
    _id: isLiked._id,
  });

  if (!deleteLikeId) {
    return res.status(404).json({
      message: "Like Id not found",
    });
  }

  const response = await decrementLikeCount(postId);
  res.status(200).json({
    message: "Post disliked successfully",
    response,
  });
}
async function updateLikeCount(postId) {
  const postWithUpdatedLikeCount = await postModel.findByIdAndUpdate(
    postId,
    { $inc: { likeCount: 1 } },
    { new: true },
  );
  return postWithUpdatedLikeCount;
}

async function decrementLikeCount(postId) {
  const updatedPost = await postModel.findByIdAndUpdate(
    postId,
    { $inc: { likeCount: -1 } },
    { new: true },
  );
  return updatedPost;
}

async function savePost(req, res) {
  const postId = req.params.postId;
  const userId = req.user.id;

  console.log(postId);
  console.log(userId);

  const doesPostExist = await saveModel.findOne({
    post: postId,
    user: userId,
  });

  if (doesPostExist) {
    res.status(400).json({
      message: `Post with give id ${postId} is already saved by ${req.user.username}`,
    });
  }

  const savedPost = await saveModel.create({
    post: postId,
    user: userId,
  });

  res.status(200).json({
    message: `Post with given id ${postId} is saved successfully`,
    post: savedPost,
  });
}
async function unsavePost(req, res) {
  const postId = req.params.postId;
  const userId = req.user.id;

  const doesSaveRecordExist = await saveModel.findOne({
    post: postId,
    user: userId,
  });

  if (!doesSaveRecordExist) {
    return res.status(400).json({
      message: "Save post record does not exist!!!",
    });
  }

  const deleteSaveRecord = await saveModel.findByIdAndDelete(
    doesSaveRecordExist._id,
  );

  if (!deleteSaveRecord) {
    res.status(409).json({
      message: "Something went wrong in deleting the save record!!!",
    });
  }

  res.status(200).json({
    message: `Post ${postId} deleted successfully!!`,
  });
}

async function getFeed(req, res) {
  const user = req.user;

  const posts = await Promise.all(
    (await postModel.find().sort({ _id: -1 }).populate("user").lean()).map(
      async (post) => {
        const isLiked = await likeModel.findOne({
          $and: [
            { likedBy: user.username },
            {
              postId: post._id,
            },
          ],
        });

        const isFollowing = await followModel.findOne({
          $and: [
            {
              follower: req.user.username,
            },
            {
              following: post.user.username,
            },
          ],
        });

        const isSaved = await saveModel.findOne({
          $and: [{ post: post._id }, { user: user.id }],
        });

        post.isSaved = !!isSaved;
        post.isFollowed = !!isFollowing;
        post.isLiked = !!isLiked;
        return post;
      },
    ),
  );

  return res.status(200).json({
    message: "posts fetched successfully!!!",
    posts,
  });
}

module.exports = {
  createPost,
  getPosts,
  getPostDetails,
  getFeed,
  likePost,
  dislikePost,
  savePost,
  unsavePost,
};
