const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");
const cors = require("cors");

app.use(express.static("./public"));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api", postRouter);
app.use("/api", userRouter);
// app.use("*name", (req, res) => {
//   res.send("You have entered wrong URL!!!");
// });

module.exports = app;
