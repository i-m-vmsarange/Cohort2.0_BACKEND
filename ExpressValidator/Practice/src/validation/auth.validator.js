import { body,validationResult } from "express-validator";


const  validate =  (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }
         next()
    }

export const registerValidation = [
    body("username").isString().withMessage("Username should be String!!"),
    body("email").isEmail().withMessage("Email should be valid email address!!!"),
    body("password").isLength({min: 6, max: 20}).withMessage("Password should be minimum 6 or 10 characters long!!"),
   validate
];

