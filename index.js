const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const config = require("config");

const app = express();
app.use(express.json());

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
app.listen(3000, () => console.log("listing on port 3000..."));
