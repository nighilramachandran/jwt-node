const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const genreRoute = require("./routes/genre");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");

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

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/course", genreRoute);
app.listen(3000, () => console.log("listing on port 3000..."));
