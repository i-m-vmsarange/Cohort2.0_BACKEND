import { body,validationResult } from "express-validator";

const validate =  (req,res,next)=>{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }
        next();
    }

const registerValidation = [
    body("username").isString().withMessage("Username should be String"),
    body("email").isEmail().withMessage("Email should be valid email address"),
    body("password").isLength({min:6,max: 15}).withMessage("Password should be of min. 6 or max. 15 characters."),
   validate
]

export default registerValidation;