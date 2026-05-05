import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import handleError from "./middlewares/error.middleware.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);

app.use(handleError)

export default app;