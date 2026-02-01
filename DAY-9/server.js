// server ko start karna
// database se connect karna
require("dotenv").config();
const connectToDB = require("./src/config/database")
const app = require("./src/app");

connectToDB();

app.listen(3000, () => {
  console.log("Server is running on port no. 3000");
});
