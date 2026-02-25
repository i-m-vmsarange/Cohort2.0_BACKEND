const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const doesUserExist = await userModel.findOne({
    $and: [
      { username: username },
      {
        email: email,
      },
    ],
  });

  if (doesUserExist) {
    return res.status(409).json({
      message: "User with given email or username already exists!!!",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully!!!",
    user,
  });
}

async function loginController(req, res) {
  const { email, username, password } = req.body;

  const user = await userModel.findOne({
    $and: [{ email }, { username }],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found!!!",
    });
  }
  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) {
    return res.status(404).json({
      message: "Invalid password!!!",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully!!!",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
