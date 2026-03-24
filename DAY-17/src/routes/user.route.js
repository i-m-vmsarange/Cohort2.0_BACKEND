const express = require("express");
const identifyUser = require("../../../DAY-14/src/middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();

/**
 * @route POST /api/follow/:username
 * @description follow the user with the given username and create a follow record in the database
 */
userRouter.post("/follow/:username", identifyUser, userController.followUser);

/**
 * @route DELETE /api/unfollow/:username
 * @description unfollow the user with the given username and delete the follow record from the database
 */
userRouter.delete(
  "/unfollow/:username",
  identifyUser,
  userController.unFollowUser,
);

module.exports = userRouter;
