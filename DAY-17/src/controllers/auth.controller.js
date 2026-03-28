const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const IMAGEKIT = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imageKit = new IMAGEKIT({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});

async function registerUser(req, res) {
  const response = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer, "file")),
    fileName: req.file.originalname,
    folder: "profile-pics",
  });

  const { username, email, password, bio } = req.body;

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
    profileImg: response.url,
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

  const dbUser = await userModel
    .findOne({
      $or: [
        {
          username,
        },
        {
          email,
        },
      ],
    })
    .select("+password");

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
async function getMeUser(req, res) {
  const userId = req.user.id;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(403).json({
      message: "Not a registered user!!",
    });
  }

  return res.status(200).json({
    message: "Registered user",
    user: {
      user,
    },
  });
}
async function logOutUser(req, res) {
  res.clearCookie("jwt_token");
  res.status(200).json({
    message: `You are logged out successfully!!!`,
  });
}
module.exports = {
  registerUser,
  loginUser,
  getMeUser,
  logOutUser,
};
