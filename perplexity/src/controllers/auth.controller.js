import USER from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function registerUser(req,res,next){

    let { username, email, password } = req.body;
    if (typeof username === "string") username = username.trim();
    if (typeof email === "string") email = email.trim();
    if (typeof password === "string") password = password.trim();

    try{
        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required!!"
            });
        }
        // check if user already exists
        const dbUser = await USER.findOne({
            $or: [
                {
                    username
                },
                {
                    email
                }
            ]
        })

        if(dbUser){
            return res.status(409).json({
                success: false,
                 message: "User already exists!!",
            })
        }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the user
      const user = new USER({
        username,
        email,
        password: hashedPassword
      });
      await user.save();

      // Remove sensitive fields before sending user data
      const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email
      };

      // If you want to generate a token, uncomment and implement the following lines:
      // Implement generateToken as needed
     
      
      const token = jwt.sign({
        id: user._id,
        username: user.username
      },process.env.JWT_SECRET_KEY,{
        expiresIn: "1d"
      })
      res.cookie("jwt_token", token);

      
      return res.status(201).json({
        success: true,
        message: "User registered successfully!!!",
        user: userResponse
      });
    }catch(error){
        console.error("Error in registerUser:", error);
        error.status = 500;
        next(error);
    }
}