const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function postController(req, res) {
  // req.file.buffer comes from multer
  const buffer = req.file.buffer;

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(buffer), req.file.originalname),
    fileName: req.file.originalname,
  });

  res.send({ message: "File uploaded successfully", file });
}

module.exports = {
  postController,
};
