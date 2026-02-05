const express = require("express");
const userModel = require("./models/user.model");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

//Saving the user
app.post("/api/users", async (req, res) => {
  const { username, description, occupation } = req.body;

  const user = await userModel.create({
    username,
    description,
    occupation,
  });

  res.status(201).json({
    message: "User created successfully",
    user,
  });
});

//Get all users

app.get("/api/users", async (req, res) => {
  const users = await userModel.find();

  res.status(200).json({
    message: "Present users",
    users,
  });
});

// DELETE user
app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;

  const user = await userModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "User deleted successfully",
    user,
  });
});

// Find one by id and update the description
app.patch("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const { occupation } = req.body;

  const user = await userModel.findByIdAndUpdate(id, { occupation });

  res.status(200).json({
    message: "Description updated successfully",
    user,
  });
});

// Wild card
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
