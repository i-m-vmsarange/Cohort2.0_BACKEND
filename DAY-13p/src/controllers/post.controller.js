const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");

const imagekit = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});

async function createPost(req, res) {
  const token = req.cookies.token;

  const response = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.originalname,
    folder: "nitpl-dev-posts",
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
    message: "File uploaded successfully",
    post: {
      post,
    },
  });
}

module.exports = {
  createPost,
};
