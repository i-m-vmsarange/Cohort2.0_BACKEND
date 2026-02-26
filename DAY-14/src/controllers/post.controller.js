const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});

async function createPost(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access!!!",
    });
  }

  const response = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.originalname,
    folder: "day-14",
  });

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized access!!!",
    });
  }

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: response.url,
    user: decoded.id,
  });

  res.status(200).json({
    message: "Post created successfully!!!",
    post,
  });
}
async function getPosts(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({
      message: "User not registered!!!",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized access!!",
    });
  }

  const posts = await postModel.find({
    user: decoded.id,
  });

  res.status(200).json({
    message: "Posts fetched successfully!!!",
    posts,
  });
}
async function getPostDetails(req, res) {
  // 1. Check whether it is a registered user or not
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized acess!!!",
    });
  }

  // 2. Verify token with our jwt
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Not a valid token",
    });
  }

  const userId = decoded.id;

  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post with given id not found!!",
    });
  }
  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content!!!",
    });
  }
  res.status(200).json({
    message: "Post found sucessfully!!!",
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
