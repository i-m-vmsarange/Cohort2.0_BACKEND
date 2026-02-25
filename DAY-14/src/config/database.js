const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MONGDB");
  });
}

module.exports = connectToDb;
