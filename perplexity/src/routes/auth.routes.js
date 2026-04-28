import express from "express";
const authRouter = express.Router();
import { registerUser } from "../controllers/auth.controller.js";
import registerValidation from "../validation/auth.validator.js";


authRouter.post("/register",registerValidation,registerUser);

export default authRouter;