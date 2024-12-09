require("express-async-errors");

const userRoute = require("../routes/auth");
const authRoute = require("../routes/auth");
const genreRoute = require("../routes/genre");
const error = require("../middleware/error");
const helmet = require("helmet");
const morgan = require("morgan");

const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("tiny"));
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/users", userRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/course", genreRoute);
  // this should the last one amoung the middleware
  app.use(error);
};
