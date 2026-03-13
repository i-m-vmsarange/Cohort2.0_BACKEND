const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { identifyUser } = require("../middlewares/auth.middleware");

// To create a post
postRouter.post(
  "/post",
  upload.single("imgUrl"),
  identifyUser,
  postController.createPost,
);
// To get the post of particular user
postRouter.get("/getPosts", identifyUser, postController.getPosts);
// To check whether the given post belong to the signed in user or not
postRouter.get("/details/:postId", identifyUser, postController.getPostDetails);

/**
 * @description fetches all the posts from the database
 *
 */
postRouter.get("/feed", identifyUser, postController.getFeed);
module.exports = postRouter;
