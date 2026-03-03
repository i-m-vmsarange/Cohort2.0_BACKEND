const express = require("express");
const identifyUser = require("../../../DAY-14/src/middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/follow/:username", identifyUser, userController.followUser);

module.exports = userRouter;
