const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { username, email, password, bio, profileImg } = req.body;

  const doesUserExist = await userModel.findOne({
    $and: [
      {
        email,
      },
      {
        password,
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
    profileImg,
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
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $and: [
      {
        username,
      },
      {
        email,
      },
    ],
  });
  if (!user) {
    return res.status(404).json({
      message: "User with given username or email does not exist!!!",
    });
  }
  const isValidPass = await bcrypt.compare(password, user.password);

  if (!isValidPass) {
    return res.status(401).json({
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
    message: "User logged in successfully!!!!",
  });
}

module.exports = {
  registerUser,
  loginUser,
};
