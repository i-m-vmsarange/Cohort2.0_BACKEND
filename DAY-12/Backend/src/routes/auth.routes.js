const express = require("express");
const userModel = require("../models/users.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const dbEmail = await userModel.findOne({ email });

  if (dbEmail) {
    return res.status(409).json({
      message: "User with the given email address already exists",
    });
  }
  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hash,
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

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    message: "This is protected route",
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User with the given email address not found!",
    });
  }

  const checkPassword =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!checkPassword) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User logged in successfully!",
  });
});

authRouter.delete("/deleteAll/users", async (req, res) => {
  const users = await userModel.deleteMany();
  res.status(200).json({
    message: "Users deleted successfully",
    users,
  });
});

module.exports = authRouter;
