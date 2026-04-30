import express from "express";
const authRouter = express.Router();
import { registerUser,verifyEmail } from "../controllers/auth.controller.js";
import registerValidation from "../validation/auth.validator.js";


authRouter.post("/register",registerValidation,registerUser);

authRouter.get("/verify-email",verifyEmail);

export default authRouter;