require("express-async-errors");
const winston = require("winston");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    winston.error(ex.message, ex);
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

  winston.add(new winston.transports.File({ filename: "logs.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/vidly",
      collection: "log", // Optional: collection name
    })
  );
};
