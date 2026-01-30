// Server ko start karna
// Database se connect karna

require("dotenv").config();
const connectToDB = require("./src/config/database");

const app = require("./src/app");

connectToDB();

app.listen(3000, () => {
  console.log("server is running on port no. 3000");
});
