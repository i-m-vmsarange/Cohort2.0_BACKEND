const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password, bio, profileImg } = req.body;
  console.log(username, email, password);
  const dbUser = await userModel.findOne({
    $or: [
      {
        username,
      },
      {
        email,
      },
    ],
  });

  if (dbUser) {
    return res.status(409).json({
      message: "User with given username or email already exists!!!",
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
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "User registered successfully!!!!",
  });
}
async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const dbUser = await userModel.findOne({
    $or: [
      {
        username,
      },
      {
        email,
      },
    ],
  });

  if (!dbUser) {
    return res.status(404).json({
      message: "User with the given email or username does not exist!!!",
    });
  }

  const isValidPass = await bcrypt.compare(password, dbUser.password);

  if (!isValidPass) {
    return res.status(401).json({
      message: "Invaldi Password!!!",
    });
  }

  const token = jwt.sign(
    {
      id: dbUser._id,
      username: dbUser.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User logged in successfully!!!",
    user: {
      username: dbUser.username,
      email: dbUser.email,
      bio: dbUser.bio,
    },
  });
}

module.exports = {
  registerUser,
  loginUser,
};
