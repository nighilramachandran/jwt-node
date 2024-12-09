require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

const express = require("express");
const config = require("config");

const app = express();
// Routes
require("./startup/routes")(app);
// DB
require("./startup/db")();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR : Jwt token not defined");
  // 0: success
  // 1: anything other that 0 failure
  process.exit(1);
}

// throw new Error("Uncaught error");
process.on("uncaughtException", (ex) => {
  winston.error(ex.message, ex);
  // 0: success
  // 1: anything other that 0 failure
  process.exit(1);
});

// winston.ExceptionHandler(
//   new winston.transports.File({ filename: "uncaughtExpection.log" })
// );

// const p = Promise.reject(new Error("Not handled the rejection"));
process.on("unhandledRejection", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.add(new winston.transports.File({ filename: "error.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost:27017/vidly", // MongoDB connection string
    collection: "log", // Optional: collection name
    options: { useUnifiedTopology: true }, // Required for modern MongoDB
  })
);

app.listen(3000, () => console.log("listing on port 3000..."));
