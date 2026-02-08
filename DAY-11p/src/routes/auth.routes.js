const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookieparser");

authRouter.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, age } = req.body;

  const doesUserAlreadyExists = await userModel.findOne({ email });

  if (doesUserAlreadyExists) {
    console.log("User with the given email already exists");
    return res.status(409).json({
      message: "User with the given email already exists",
    });
  }

  const user = await userModel.create({
    username,
    email,
    age,
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
    message: "User is registered successfully",
    user,
    token,
  });
});

module.exports = authRouter;
