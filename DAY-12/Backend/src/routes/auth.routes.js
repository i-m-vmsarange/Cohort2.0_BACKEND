const express = require("express");
const userModel = require("../models/users.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const dbEmail = await userModel.findOne({ email });

  if (dbEmail) {
    return res.status(409).json({
      message: "User with the given email address already exists",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "User registered successfully",
    user,
    token,
  });
});

module.exports = authRouter;
