const express = require("express");
const authController = require("../controllers/auth.controller");
const { identifyUser } = require("../middlewares/auth.middleware");
const authRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

authRouter.post(
  "/register",
  upload.single("profileImg"),
  authController.registerUser,
);
authRouter.post("/login", authController.loginUser);
authRouter.get("/getMe", identifyUser, authController.getMeUser);
authRouter.post("/logout", authController.logOutUser);

module.exports = authRouter;
