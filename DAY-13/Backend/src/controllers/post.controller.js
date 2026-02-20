const postModel = require("../models/post.model");

async function postController(req, res) {
  console.log(req.file);
}

module.exports = {
  postController,
};
