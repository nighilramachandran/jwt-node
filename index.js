require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const genreRoute = require("./routes/genre");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const error = require("./middleware/error");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR : Jwt token not defined");
  // 0: success
  // 1: anything other that 0 failure
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("Connected to db.."))
  .catch((e) => console.log("error", e));

// throw new Error("Uncaught error");
process.on("uncaughtException", (ex) => {
  console.log("we got an uncaught error");
  winston.error(ex.message, ex);
});

winston.add(new winston.transports.File({ filename: "error.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost:27017/vidly", // MongoDB connection string
    collection: "log", // Optional: collection name
    options: { useUnifiedTopology: true }, // Required for modern MongoDB
  })
);

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/course", genreRoute);
// this should the last one amoung the middleware
app.use(error);

app.listen(3000, () => console.log("listing on port 3000..."));
