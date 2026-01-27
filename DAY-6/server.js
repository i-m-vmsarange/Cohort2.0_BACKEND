const app = require("./src/app");
const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(
      "mongodb+srv://divyasarange29_db_user:iAVlaNiwhOeEgiKY@cluster0.x05tr8v.mongodb.net/day-6",
    )
    .then(() => {
      console.log("Connected to database");
    });
}
connectToDb();
app.listen(3000, () => {
  console.log("Server is running on port no. 3000");
});
