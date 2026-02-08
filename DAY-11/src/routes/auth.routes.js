const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

// If you want to create apis in the files other than app.js we use Router() method of express

const authRouter = express.Router();

// To register user in the database

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User with this email already exists",
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
    message: "user registered succesfully",
    user,
    token,
  });
});

module.exports = authRouter;
