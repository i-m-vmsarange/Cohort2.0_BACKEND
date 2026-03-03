const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { identifyUser } = require("../middlewares/auth.middleware");

postRouter.post(
  "/post",
  upload.single("imgUrl"),
  identifyUser,
  postController.createPost,
);
postRouter.get("/getPosts", identifyUser, postController.getPosts);
postRouter.get("/details/:postId", identifyUser, postController.getPostDetails);
module.exports = postRouter;
