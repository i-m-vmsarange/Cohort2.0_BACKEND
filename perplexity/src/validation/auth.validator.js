import { body,validationResult } from "express-validator";

const validate =  (req,res,next)=>{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }
        next();
}

export const registerValidation = [
    body("username").isString().withMessage("Username should be String"),
    body("email").isEmail().withMessage("Email should be valid email address"),
    body("password").isLength({min:6,max: 15}).withMessage("Password should be of min. 6 or max. 15 characters."),
   validate
]

export const loginValidation = [
    body("identifier").notEmpty().withMessage("Username or email is required!!").custom((value)=>{
        const isEmail = /\S+@\S+\.\S+/.test(value);
        const isUsername =  value.length >= 3 && value.length <= 30;  
        
        if(!isEmail && !isUsername){
            throw new Error("Identifier must be a valid email or username!!");
        }
        return true;
    }),
    body("password").notEmpty().isLength({min: 6, max: 15}).withMessage("Password should be of min. 6 or max. 15 characters."),
    validate
]