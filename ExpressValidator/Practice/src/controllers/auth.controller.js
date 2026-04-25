import USER from "../models/user.model.js";
export async function registerUser(req,res,next){
    try{
         
        const {username,email,password} = req.body;

        const dbUser = await USER.findOne({
            $or:[
                {username},
                {email}
            ]
        })
         if(dbUser){
            const error = new Error("User already exists with the given username or email!!");
            error.status = 400;
            throw error;
           }
          const user = await USER.create({
            username,email,password
          });
          
       return res.status(201).json({
        message: "User registered successfully!!!",
        user: user
       })
    }
   catch(error){
     error.status = error.status || 500;
    next(error)
   }
}

/** ON SUCCESS
 * ```json
 * { 
 * message: "User registered successfully!!!"
 * }
 * 
 * USER: {
 *  username:{
 *  type: String,
 *  required: true
 * },
 *  email:{
 * 
 *  type: String,
 *  required: true
 * },
 *  password:{
 *  type: String,
 *  required: true
 * }
 * }
 */

