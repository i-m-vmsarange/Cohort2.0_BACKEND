const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { username, email, password, bio, profile_image } = req.body;

  const doesUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (doesUserExist) {
    return res.status(409).json({
      message:
        "User with given " +
        (doesUserExist.email === email
          ? "email already exists."
          : "username already exists."),
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profile_image,
  });
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

module.exports = authRouter;
