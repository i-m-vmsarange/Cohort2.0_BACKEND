const postModel = require("../models/post.model");
const likeModel = require("../models/likes.model");
const IMAGEKIT = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new IMAGEKIT({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});

async function createPost(req, res) {
  console.log(req.body, req.file.Buffer);
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

  await updateLikeCount(postId);

  return res.status(201).json({
    message: `${postId} is liked by ${username}`,
    like,
  });
}

async function updateLikeCount(postId) {
  const postWithUpdatedLikeCount = await postModel.findByIdAndUpdate(
    postId,

    { $inc: { likeCount: 1 } },
    { new: true },
  );
  console.log(postWithUpdatedLikeCount);
}

async function getFeed(req, res) {
  const user = req.user;

  const posts = await Promise.all(
    (await postModel.find().populate("user").lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        likedBy: user.username,
        postId: post._id,
      });

      post.isLiked = isLiked;
      return post;
    }),
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
};
