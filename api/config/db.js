require("dotenv").config();
const config = require("./config.js");
const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(config.databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectDB;
