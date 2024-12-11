const mongoose = require("mongoose");
const winston = require("winston");
require("winston-mongodb");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  mongoose.connect(db).then(() => {
    new winston.transports.Console(`Connected to ${db} DB`);
    winston.info(`Connected to ${db} DB`);
    console.log(`Connected to ${db} DB`);
  });
};
