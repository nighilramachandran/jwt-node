const mongoose = require("mongoose");
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  mongoose.connect("mongodb://localhost:27017/vidly").then(() => {
    new winston.transports.Console("Connected to DB");
    winston.info("Connected to DB..");
  });
};
