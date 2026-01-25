const app = require("./src/app");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("Server is running on port no. 3000");
});
