import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

 export default  async function authUser(req, res, next) {
  const token = req.cookies.jwt_token;
 
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access!!",
    });
  }
  
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } 
  catch (err) {
    return res.status(401).json({
      message: `${err.message}`
    });
  }
}