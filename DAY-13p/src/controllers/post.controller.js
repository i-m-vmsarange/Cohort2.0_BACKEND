const postModel = require("../models/post.model");
const multer = require("multer");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});

async function createPost(req, res) {
  const response = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });

  res.status(200).json({
    message: "File uploaded successfully",
    response,
  });
}

module.exports = {
  createPost,
};
