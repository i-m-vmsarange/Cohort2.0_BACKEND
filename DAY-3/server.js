const express = require("express");

const app = express(); // to create server instance

app.use(express.json()); // to fetch the data from req.body

const notes = [];

app.post("/notes", (req, res) => {
  const data = req.body;
  notes.push(data);
  res.send(notes);
});
app.get("/notes", (req, res) => {
  res.send(notes);
});

app.listen(3000, () => {
  console.log("Server is running on port no. 3000");
}); // To run the server
