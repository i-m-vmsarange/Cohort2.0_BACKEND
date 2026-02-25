const userModel = require("../config/database.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  const { username, email, password, bio, profileImg } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImg,
  });

  const token = jwt.sign("token", process.env.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("token");
}
