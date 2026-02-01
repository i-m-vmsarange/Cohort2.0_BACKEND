require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/database.js");
const noteModel = require("./models/user.model.js");

const app = express();

connectToDB();

app.use(express.json());

// POST API

app.post("/users", async (req, res) => {
  const { username, company, address, age } = req.body;

  const user = await noteModel.create({
    username,
    company,
    address,
    age,
  });
  res.status(201).json({
    message: "User created successfully",
    user,
  });
});

module.exports = app;
