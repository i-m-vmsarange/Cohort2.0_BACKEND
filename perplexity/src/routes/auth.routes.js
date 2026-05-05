import express from "express";
const authRouter = express.Router();
import authUser from "../middlewares/auth.middleware.js";
import { registerUser,loginUser,verifyEmail,getUser } from "../controllers/auth.controller.js";
import {registerValidation,loginValidation} from "../validation/auth.validator.js";

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public   
 * @body { username, email, password }
 * @returns { success: boolean, message: string }       
 */

authRouter.post("/register",registerValidation,registerUser);

/**
 * @POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public 
 * @body {email,password}
 */
authRouter.post("/login",loginValidation,loginUser);
/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email
 * @access Public
 * @query {emailToken}
 * @returns
 */
authRouter.get("/verify-email",verifyEmail);

/**
 * @route GET /api/auth/get-me
 * @desc To get current logged in user
 * @access Public
 * @returns Current logged in user
 */
authRouter.get("/get-me",authUser,getUser);





export default authRouter;