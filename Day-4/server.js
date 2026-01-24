// Server ko start karna

const app = require("./src/app.js");

let notes = [];

app.get("/getAll", (req, res) => {
  res.send(notes);
});

// Post API
app.post("/postNote", (req, res) => {
  const note = req.body;
  notes.push(note);
  res.send(notes);
});

// DELETE API

app.delete("/deleteNote/:index", (req, res) => {
  // Fetching the id from the api
  let params = req.params;
  //   Finding the object present in notes array with the requested id
  const result = notes.find((note) => note.id == params.index);
  // Updating the existing array after removing the delete request object
  if (result != undefined) {
    notes = notes.filter((note) => note.id !== result.id);
    res.send(notes);
  } else {
    res.send("User with the give ID: " + req.params.index + " not found");
  }
  //   delete notes[req.params.index];
});

// PATCH API
// where client can update any apis only description

app.patch("/updateDescription/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;
  res.send(notes);
});

app.listen(3000, () => {
  console.log("Server is running");
});
