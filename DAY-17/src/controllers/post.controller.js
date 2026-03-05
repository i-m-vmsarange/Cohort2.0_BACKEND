const postModel = require("../models/post.model");
const IMAGEKIT = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

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
      message: "Posts with the given id not found!!!",
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
module.exports = {
  createPost,
  getPosts,
  getPostDetails,
};
