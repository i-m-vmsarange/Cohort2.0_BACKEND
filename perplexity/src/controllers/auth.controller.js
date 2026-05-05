import USER from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../service/mail.service.js";


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

      const verifyEmailToken = jwt.sign({
        email: user.email
      },process.env.JWT_SECRET_KEY,{expiresIn: "1d"});

    const response = await sendEmail({
        to: `${user.email}`,
        subject: "Welcome to Perplexity!!",
        html: `<h1>Welcome to Perplexity, ${user.username}!!</h1><p>Thank you for registering with us. We're excited to have you on board!</p>
        <br/><p>Please click on following link to verify your email:</p><br/><a href="http://localhost:3000/api/auth/verify-email?emailToken=${verifyEmailToken}">Verify Email</a><br/><p>Best regards,<br/>The Perplexity Team</p>`,
      })
    console.log(response);

    
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
        error.status = error.status || 500;
        next(error);
    }
}
export async function loginUser(req,res,next){
     
   try{
     let {identifier,password} = req.body;

    if(typeof identifier === "string") identifier = identifier.trim();
    if(typeof password === "string") password = password.trim();

    if(!identifier || !password){
      return res.status(400).json({
        success: false,
        message: "All fields are required!!"
      })
    }

    const dbUser = await USER.findOne({
      $or:[
        {username: identifier},
        {
          email: identifier
        }
      ]
    });

    if(!dbUser){
      return res.status(409).json({
        success: false,
        message: "Invalid credentials!!"
      })
    }

    const isValidPass = await bcrypt.compare(password,dbUser.password);

    if(!isValidPass){
      return res.status(409).json({
        success: false,
        message: "Invalid credentials!!"
      })
    }

    const token = jwt.sign({
      id: dbUser._id,
      username: dbUser.username
    },process.env.JWT_SECRET_KEY,{expiresIn: "1d"});

    res.cookie("jwt_token",token);

   return res.status(200).json({
    success: true,
    message: "User logged in successfully!!",
    user: {
      username: dbUser.username,
      email: dbUser.email
    }
   })
   }
   catch(error){
    error.status = error.status || 500;
      next(error);
   }

}
export async function verifyEmail(req,res,next){
      
     try{
      const {emailToken} = req.query;
      
     const decoded = jwt.verify(emailToken,process.env.JWT_SECRET_KEY);

     const user = await USER.findOne({email: decoded.email});

      if(!user){
        res.status(400).json({
          message: "Invalid token!!",
          success: false
        })
      }

      user.verified = true;

      user.save();

      const html = `
         <h1>Email verified successfully!!!</h1>
         <p>Please go to <a href="#">Login Page</a></p>
      `
         res.status(200).send(html);
     }
     catch(error){
      error.status = error.status || 500;
      next(error)
     }
}
export async function getUser(req,res,next){
       try{
              const user = req.user;
              
             const dbUser = await USER.findById(user.id);

             if(!dbUser){
              return res.status(404).json({
                success: false,
                message: "User not found!!"
              })
             }

             res.status(200).json({
              success: true,
              message: "Current logged in user!!",
              user: {
                id: dbUser._id,
                username: dbUser.username,
                email: dbUser.email
              }
             })
       }
       catch(error){
        error.status = error.status || 500;
        next(error);
       }
}