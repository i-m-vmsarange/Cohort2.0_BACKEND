const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  const token = req.cookies.jwt_token;
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Acess!!",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Not a registered user!!",
    });
  }

  req.user = decoded;
  next();
}

module.exports = {
  identifyUser,
};
