import express from "express";
const authRouter = express.Router();
import { registerUser,loginUser,verifyEmail } from "../controllers/auth.controller.js";
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

export default authRouter;