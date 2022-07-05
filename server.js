const server = {
  start() {
    const app = initializeApp();
    addErrorResponses(app);
    connectToDatabaseAndRunApp(app);
  },
};

function initializeApp() {
  require("dotenv").config();
  const cors = require("cors");
  const express = require("express");
  const router = require("./api/config/routes");

  const app = express();

  app.use(cors());

  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));

  // parse application/json
  app.use(express.json());

  //api/controllers entry point
  app.use("/", router);

  return app;
}

function addErrorResponses(app) {
  app.use((error, _, res, __) => {
    const ApiError = require("./api_error");

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        message: error.message,
        ...error.extraAttributes,
      });
    }

    console.log(error.stack);
    res.status(500).json({
      message: "Something went wrong",
    });
  });
}

function connectToDatabaseAndRunApp(app) {
  const mongoose = require("mongoose");
  const connectMongoDB = require("./api/config/db");

  connectMongoDB();

  mongoose.connection.once("open", () => {
    console.log("Connected to database");
    app.listen(process.env.PORT || 8000, () => console.log("Server Started"));
  });
}

server.start();

module.exports = server;
