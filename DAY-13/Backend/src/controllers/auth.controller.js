const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function loginController(req, res) {
  const { email, username, password } = req.body;

  const user = await userModel.findOne({
    $and: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  if (!user) {
    return res.status(400).json({
      message: "Please check username or email!!!",
    });
  }

  const hash = await bcrypt.compare(password, user.password);

  const validPass = hash === user.password;

  if (!validPass) {
    return res.status(404).json({
      message: "Invalid password!",
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
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}
async function registerController(req, res) {
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

  const hash = await bcrypt.hash(password);

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
}

module.exports = {
  registerController,
  loginController,
};
