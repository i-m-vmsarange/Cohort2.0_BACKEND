const express = require("express");
const app = express();
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api", postRouter);

module.exports = app;
