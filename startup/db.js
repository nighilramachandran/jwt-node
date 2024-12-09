const mongoose = require("mongoose");
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost:27017/vidly")
    .then(() => winston.info("Connected to DB.."));
};
