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
/**
 * @route GET/api/getPosts
 * @description fetches the all posts of logged in user
 */
postRouter.get("/getPosts", identifyUser, postController.getPosts);

/**
 * @route GET/api/details/:postId
 * @description fetches the details of post with PostId and checks it belongs
 * to logged in user or not
 */

postRouter.get("/details/:postId", identifyUser, postController.getPostDetails);

/**
 * @route POST /api/like/:postid
 * @description //like the post using id provided in the request params
 */

postRouter.post("/like/:postId", identifyUser, postController.likePost);

/**
 * @route dislike post with the given id
 * @description POST/API dislike the post with given id and decrement like count
 */
postRouter.post("/dislike/:postId", identifyUser, postController.dislikePost);

/**
 * @route POST /api/updateLikeCount/:postId
 * @description updates the like count of the post when user likes the post with id mentioned in params
 */

/**
 * @route GET/api/feed
 * @description fetches all the posts from the database
 *
 */
postRouter.get("/feed", identifyUser, postController.getFeed);
module.exports = postRouter;
