const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

postRouter.post(
  "/post",
  upload.single("imgUrl"),
  identifyUser,
  postController.createPost,
);
postRouter.get("/get", identifyUser, postController.getPosts);
postRouter.get("/details/:postId", identifyUser, postController.getPostDetails);

/* 
     GET/api/posts/details/:postId
     return the detail about the post and verify whether it belongs to the logged in user or not
 */

module.exports = postRouter;
