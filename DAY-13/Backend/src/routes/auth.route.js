const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { username, email, password, bio, profile_image } = req.body;

  const doesUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (doesUserExist) {
    return res.status(409).json({
      message:
        "User with given " +
        (doesUserExist.email
          ? "email already exists."
          : "username already exists."),
    });
  }
  const user = await userModel.create({
    username,
    email,
    password,
    bio,
    profile_image,
  });
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

module.exports = authRouter;
